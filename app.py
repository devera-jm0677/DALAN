from flask import *
from flask_cors import CORS
import pymysql
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = "d4l4n"  # change later
CORS(app)

# =====================================================
# DATABASE CONNECTION
# =====================================================

def get_db_connection():
    return pymysql.connect(
        host="localhost",
        user="root",
        password="",
        database="dalandb",
        cursorclass=pymysql.cursors.DictCursor
    )

# =====================================================
# AUTH ROUTES
# =====================================================

@app.route("/api/register", methods=["POST"])
def register():
    data = request.json

    first_name = data.get("first_name")
    last_name = data.get("last_name")
    email = data.get("email")
    password = data.get("password")

    if not all([first_name, last_name, email, password]):
        return jsonify({"error": "All fields are required"}), 400

    hashed_password = generate_password_hash(password)

    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            # Check if email already exists
            cursor.execute(
                "SELECT user_id FROM users WHERE email = %s",
                (email,)
            )
            if cursor.fetchone():
                return jsonify({"error": "Email already registered"}), 409

            # Insert new user
            cursor.execute(
                """
                INSERT INTO users (first_name, last_name, email, password)
                VALUES (%s, %s, %s, %s)
                """,
                (first_name, last_name, email, hashed_password)
            )
            conn.commit()

            user_id = cursor.lastrowid
            session["user_id"] = user_id

        return jsonify({
            "success": True,
            "user_id": user_id
        })

    finally:
        conn.close()


@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute(
                """
                SELECT user_id, first_name, last_name, email, password
                FROM users
                WHERE email = %s
                """,
                (email,)
            )
            user = cursor.fetchone()

            if not user or not check_password_hash(user["password"], password):
                return jsonify({"error": "Invalid credentials"}), 401

            # Optional for later
            # session["user_id"] = user["user_id"]

        return jsonify({
            "success": True,
            "user": {
                "user_id": user["user_id"],
                "first_name": user["first_name"],
                "last_name": user["last_name"],
                "email": user["email"]
            }
        })

    finally:
        conn.close()

@app.route("/api/logout", methods=["GET"])
def logout():
    session.clear()
    return jsonify({"success": True})

# =====================================================
# USER PROFILE / SETUP (shared)
# =====================================================
@app.route("/setup")
def setup():
    return render_template("setup.html")

@app.route("/api/user/profile", methods=["GET"])
def get_user_profile():
    if "user_id" not in session:
        return jsonify({"error": "Unauthorized"}), 401

    # TODO: fetch user_profile by user_id
    return jsonify({})


@app.route("/api/user/profile", methods=["POST"])
def save_user_profile():
    if "user_id" not in session:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.json
    user_id = session["user_id"]

    shs_strand_id = data.get("shsStrandId")
    municipality_id = data.get("municipalityId")
    institution_type_id = data.get("institutionTypeId")
    budget_id = data.get("budgetId")
    program_ids = data.get("programIds", [])

    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:

            # UPSERT user profile
            cursor.execute("""
                INSERT INTO user_profiles
                    (user_id, shs_strand_id, municipality_id, institution_type_id, budget_id)
                VALUES (%s, %s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                    shs_strand_id = VALUES(shs_strand_id),
                    municipality_id = VALUES(municipality_id),
                    institution_type_id = VALUES(institution_type_id),
                    budget_id = VALUES(budget_id)
            """, (
                user_id,
                shs_strand_id,
                municipality_id,
                institution_type_id,
                budget_id
            ))

            # Clear old program preferences
            cursor.execute("""
                DELETE FROM user_program_preferences
                WHERE user_id = %s
            """, (user_id,))

            # Insert new program preferences
            for pid in program_ids:
                cursor.execute("""
                    INSERT INTO user_program_preferences (user_id, interest_program_id)
                    VALUES (%s, %s)
                """, (user_id, pid))

            conn.commit()

        return jsonify({"success": True})

    finally:
        conn.close()

@app.route("/api/shs_strands", methods=["GET"])
def get_shs_strands():
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute("""
                SELECT strand_id, strand_name
                FROM shs_strands
                ORDER BY strand_name
            """)
            return jsonify(cursor.fetchall())
    finally:
        conn.close()

@app.route("/api/programs", methods=["GET"])
def get_interest_programs():
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute("""
                SELECT interest_program_id, program_name
                FROM interest_programs
                ORDER BY program_name
            """)
            return jsonify(cursor.fetchall())
    finally:
        conn.close()

@app.route("/api/institution_type", methods=["GET"])
def get_institution_type():
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute("""
                SELECT type_id, type_name
                FROM institution_type
                ORDER BY type_id
            """)
            return jsonify(cursor.fetchall())
    finally:
        conn.close()

@app.route("/api/budget_ranges", methods=["GET"])
def get_budget_ranges():
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute("""
                SELECT budget_id, label
                FROM budget_ranges
                ORDER BY budget_id
            """)
            return jsonify(cursor.fetchall())
    finally:
        conn.close()

@app.route("/api/districts", methods=["GET"])
def get_districts():
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute("""
                SELECT district_id, district_name
                FROM districts
                ORDER BY district_id
            """)
            return jsonify(cursor.fetchall())
    finally:
        conn.close()

@app.route("/api/municipalities", methods=["GET"])
def get_municipalities():
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute("""
                SELECT municipality_id, district_id, municipality_name
                FROM municipalities
                ORDER BY municipality_name
            """)
            return jsonify(cursor.fetchall())
    finally:
        conn.close()


# =====================================================
# HOME SCREEN (DASHBOARD)
# =====================================================

@app.route("/api/graph/top-programs/<int:year>", methods=["GET"])
def top_programs(year):
    # TODO: implement GRAPH 1 query
    return jsonify([])


@app.route("/api/graph/top-universities/<int:year>", methods=["GET"])
def top_universities(year):
    # TODO: implement GRAPH 2 query
    return jsonify([])


@app.route("/api/notifications", methods=["GET"])
def notifications():
    if "user_id" not in session:
        return jsonify([])

    # TODO: fetch notifications
    return jsonify([])

# =====================================================
# SEARCH
# =====================================================

@app.route("/api/search", methods=["GET"])
def search():
    # query params:
    # keyword, location_id, type_id, budget_id, licensure_only
    # TODO: build dynamic SQL search query
    return jsonify([])

# =====================================================
# PROGRAM DETAILS
# =====================================================

@app.route("/api/program/<int:program_id>", methods=["GET"])
def program_details(program_id):
    # TODO: fetch program, university, tuition, requirements, scholarships
    return jsonify({})


@app.route("/api/program/<int:program_id>/exam-results", methods=["GET"])
def program_exam_results(program_id):
    # TODO: fetch exam_results for charts
    return jsonify([])

# =====================================================
# COMPARE
# =====================================================

@app.route("/api/compare", methods=["POST"])
def compare_programs():
    data = request.json
    program_ids = data.get("program_ids", [])

    # TODO: run comparison query using program_ids
    return jsonify([])

# =====================================================
# BOOKMARKS
# =====================================================

@app.route("/api/bookmark", methods=["POST"])
def bookmark_program():
    if "user_id" not in session:
        return jsonify({"error": "Unauthorized"}), 401

    # TODO: insert into bookmark table
    return jsonify({"success": True})


@app.route("/api/user/bookmarks", methods=["GET"])
def get_bookmarks():
    if "user_id" not in session:
        return jsonify([])

    # TODO: fetch bookmarks
    return jsonify([])

# =====================================================
# ACTIVITY LOG
# =====================================================

@app.route("/api/activity/view", methods=["POST"])
def log_activity():
    if "user_id" not in session:
        return jsonify({"success": False})

    # TODO: log user activity
    return jsonify({"success": True})

# =====================================================
# RUN APP
# =====================================================

if __name__ == "__main__":
    app.run(debug=True)
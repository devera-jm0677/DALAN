from flask import Blueprint, jsonify, request, session, render_template
import db_queries
import pymysql

setup_bp = Blueprint('setup_bp', __name__)

# --- SSR Page Routes ---

@setup_bp.route("/setup")
def setup_page():
    return render_template("setup.html")

@setup_bp.route("/profile")
def profile_page():
    user = None
    if "user_id" in session:
        user = {
            "first_name": session.get("first_name"),
            "email": session.get("email"),
            "profile_image": session.get("profile_image")
        }
    return render_template("user-profile.html", user=user)

# --- API Routes ---

@setup_bp.route("/api/setup/profile", methods=["GET"])
def get_user_profile():
    if "user_id" not in session:
        return jsonify({"error": "Unauthorized"}), 401

    user_id = session["user_id"]

    conn = db_queries.get_db_connection()
    cursor = conn.cursor()

    profile = db_queries.fetch_user_profile(cursor, user_id)

    cursor.execute("""
        SELECT interest_program_id
        FROM user_interests
        WHERE user_id = %s
    """, (user_id,))
    interests = cursor.fetchall()

    conn.close()

    return jsonify({
        "strandId": profile["strand_id"] if profile else None,
        "municipalityId": profile["municipality_id"] if profile else None,
        "institutionTypeId": profile["preferred_institution_type"] if profile else None,
        "budgetId": profile["budget_id"] if profile else None,
        "programIds": [row["interest_program_id"] for row in interests]
    })

@setup_bp.route("/api/setup/profile", methods=["POST"])
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

    conn = db_queries.get_db_connection()
    try:
        with conn.cursor() as cursor:
            db_queries.upsert_user_profile(cursor, user_id, shs_strand_id, municipality_id, institution_type_id, budget_id)
            db_queries.delete_user_program_preferences(cursor, user_id)
            for pid in program_ids:
                db_queries.insert_user_program_preference(cursor, user_id, pid)
            conn.commit()
        return jsonify({"success": True})
    except pymysql.Error as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

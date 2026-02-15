from flask import Blueprint, jsonify, request, session, render_template
from werkzeug.security import generate_password_hash, check_password_hash
import db_queries
import pymysql

auth_bp = Blueprint('auth_bp', __name__)

# --- SSR Page Routes ---

@auth_bp.route("/register")
def register_page():
    return render_template("register.html")

@auth_bp.route("/login")
def login_page():
    return render_template("login.html")

# --- API Routes ---

@auth_bp.route("/api/register", methods=["POST"])
def register():
    data = request.json
    first_name = data.get("first_name")
    last_name = data.get("last_name")
    email = data.get("email")
    password = data.get("password")

    if not all([first_name, last_name, email, password]):
        return jsonify({"error": "All fields are required"}), 400

    hashed_password = generate_password_hash(password)

    conn = db_queries.get_db_connection()
    try:
        with conn.cursor() as cursor:
            if db_queries.find_user_by_email(cursor, email):
                return jsonify({"error": "Email already registered"}), 409

            user_id = db_queries.create_user(cursor, first_name, last_name, email, hashed_password)
            conn.commit()
            session["user_id"] = user_id

        return jsonify({"success": True, "user_id": user_id})
    except pymysql.Error as e:
        return jsonify({"error": f"Database error: {e}"}), 500
    finally:
        conn.close()


@auth_bp.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    conn = db_queries.get_db_connection()
    try:
        with conn.cursor() as cursor:
            user = db_queries.find_user_by_email(cursor, email)

            if not user or not check_password_hash(user["password_hash"], password):
                return jsonify({"error": "Invalid credentials"}), 401

            return jsonify({
                "success": True,
                "user": {
                    "user_id": user["user_id"],
                    "first_name": user["first_name"],
                    "last_name": user["last_name"],
                    "email": user["email"]
                }
            })
    except pymysql.Error as e:
        return jsonify({"error": f"Database error: {e}"}), 500
    finally:
        conn.close()

@auth_bp.route("/api/logout", methods=["GET"])
def logout():
    session.clear()
    return jsonify({"success": True})

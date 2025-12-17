from flask import Blueprint, jsonify, request, session, render_template
import db_queries

setup_bp = Blueprint('setup_bp', __name__)

# --- SSR Page Routes ---

@setup_bp.route("/setup")
def setup_page():
    return render_template("setup.html")

@setup_bp.route("/profile")
def profile_page():
    return render_template("user-profile.html")

# --- API Routes ---

@setup_bp.route("/api/user/profile", methods=["GET"])
def get_user_profile():
    if "user_id" not in session:
        return jsonify({"error": "Unauthorized"}), 401
    # TODO: fetch user_profile by user_id
    return jsonify({})

@setup_bp.route("/api/user/profile", methods=["POST"])
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
    finally:
        conn.close()

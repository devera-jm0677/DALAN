from flask import Blueprint, jsonify, request, session, render_template
import db_queries

features_bp = Blueprint('features_bp', __name__)

# --- SSR Page Routes ---

@features_bp.route("/search")
def search_page():
    return render_template("search.html")

@features_bp.route("/program/<int:program_id>")
def program_page(program_id):
    return render_template("program.html")

@features_bp.route("/compare")
def compare_page():
    return render_template("compare.html")

# --- API Routes ---

@features_bp.route("/api/search", methods=["GET"])
def search():
    # query params:
    # keyword, location_id, type_id, budget_id, licensure_only
    # TODO: build dynamic SQL search query
    return jsonify([])

@features_bp.route("/api/program/<int:program_id>", methods=["GET"])
def program_details(program_id):
    # TODO: fetch program, university, tuition, requirements, scholarships
    return jsonify({})


@features_bp.route("/api/program/<int:program_id>/exam-results", methods=["GET"])
def program_exam_results(program_id):
    # TODO: fetch exam_results for charts
    return jsonify([])

@features_bp.route("/api/compare", methods=["POST"])
def compare_programs():
    data = request.json
    program_ids = data.get("program_ids", [])

    # TODO: run comparison query using program_ids
    return jsonify([])

@features_bp.route("/api/bookmark", methods=["POST"])
def bookmark_program():
    if "user_id" not in session:
        return jsonify({"error": "Unauthorized"}), 401

    # TODO: insert into bookmark table
    return jsonify({"success": True})


@features_bp.route("/api/user/bookmarks", methods=["GET"])
def get_bookmarks():
    if "user_id" not in session:
        return jsonify([])

    # TODO: fetch bookmarks
    return jsonify([])

@features_bp.route("/api/activity/view", methods=["POST"])
def log_activity():
    if "user_id" not in session:
        return jsonify({"success": False})

    # TODO: log user activity
    return jsonify({"success": True})

@features_bp.route("/api/clear-data", methods=["GET"])
def clear_data():
    conn = db_queries.get_db_connection()
    try:
        db_queries.reinitialize_database(conn)
        return "Database cleared and re-initialized."
    finally:
        conn.close()
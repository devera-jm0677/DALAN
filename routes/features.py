from flask import Blueprint, jsonify, request, session, render_template, redirect
import db_queries

features_bp = Blueprint('features_bp', __name__)

def get_session_user():
    if "user_id" not in session:
        return None
    return {
        "first_name": session.get("first_name"),
        "email": session.get("email"),
        "profile_image": session.get("profile_image")
    }

# --- SSR Page Routes ---
@features_bp.route("/search")
def search_page():
    q = request.args.get("q", "").strip()
    search_type = request.args.get("type", "all")  # all | programs | universities

    programs = []
    universities = []
    institution_types = []
    show_programs = True
    show_universities = True
    filter_scope = None
    filter_kind = None

    conn = db_queries.get_db_connection()
    try:
        with conn.cursor() as cursor:
            institution_types = db_queries.fetch_institution_types(cursor)
            if search_type == "programs":
                programs = db_queries.fetch_all_programs(cursor)
                filter_scope = "programs"
                filter_kind = "institution_type"

            elif search_type == "universities":
                universities = db_queries.fetch_all_universities(cursor)
                filter_scope = "universities"

            else:  # default keyword search
                if q:
                    universities_by_name = db_queries.search_universities_by_name(cursor, q)
                    programs_by_name = db_queries.search_programs_by_name(cursor, q)
                    universities_by_location = db_queries.search_universities_by_location(cursor, q)

                    if universities_by_name:
                        programs = db_queries.search_programs_by_university(cursor, q)
                        show_programs = True
                        show_universities = False
                        filter_scope = "programs"
                        filter_kind = "licensure"
                    elif programs_by_name:
                        programs = db_queries.search_programs_by_name(cursor, q)
                        show_programs = True
                        show_universities = False
                        filter_scope = "programs"
                        filter_kind = "institution_type"
                    elif universities_by_location:
                        programs = db_queries.search_programs(cursor, q)
                        show_programs = True
                        show_universities = False
                        filter_scope = "programs"
                        filter_kind = "licensure"
                    else:
                        show_programs = False
                        show_universities = False
    finally:
        conn.close()

    if q:
        q_lower = q.lower()
        for program in programs:
            program_name = program.get("program_name") or ""
            university_name = program.get("university_name") or ""
            location = program.get("location") or ""

            program_name_lower = program_name.lower()
            university_name_lower = university_name.lower()
            location_lower = location.lower()

            if q_lower in program_name_lower:
                program["primary_title"] = university_name
                program["secondary_title"] = program_name
            elif q_lower in location_lower or q_lower in university_name_lower:
                program["primary_title"] = program_name
                program["secondary_title"] = university_name
            else:
                program["primary_title"] = program_name
                program["secondary_title"] = university_name

    return render_template(
        "search.html",
        programs=programs,
        universities=universities,
        query=q,
        search_type=search_type,
        show_programs=show_programs,
        show_universities=show_universities,
        filter_scope=filter_scope,
        filter_kind=filter_kind,
        institution_types=institution_types,
        user=get_session_user()
    )

@features_bp.route("/programs")
def all_programs_page():
    conn = db_queries.get_db_connection()
    try:
        with conn.cursor() as cursor:
            programs = db_queries.fetch_all_programs(cursor)
    finally:
        conn.close()

    return render_template(
        "allprogram.html",
        programs=programs,
        user=get_session_user()
    )

@features_bp.route("/universities")
def all_universities_page():
    conn = db_queries.get_db_connection()
    try:
        with conn.cursor() as cursor:
            universities = db_queries.fetch_all_universities(cursor)
    finally:
        conn.close()

    return render_template(
        "alluniversities.html",
        universities=universities,
        user=get_session_user()
    )

@features_bp.route("/program/<int:program_id>")
def program_page(program_id):
    conn = db_queries.get_db_connection()
    try:
        with conn.cursor() as cursor:
            program = db_queries.fetch_program_details_ssr(cursor, program_id)
            if not program:
                return "Program not found", 404

            university_id = program["university_id"]

            tuition = db_queries.fetch_program_tuition(cursor, program_id)
            requirements = db_queries.fetch_program_requirements(cursor, program_id)
            scholarships = db_queries.fetch_program_scholarships(cursor, program_id)
            
            exam_results = {
                3: db_queries.fetch_exam_results_by_program(cursor, program_id, university_id, 3),
                5: db_queries.fetch_exam_results_by_program(cursor, program_id, university_id, 5),
                7: db_queries.fetch_exam_results_by_program(cursor, program_id, university_id, 7),
                10: db_queries.fetch_exam_results_by_program(cursor, program_id, university_id, 10),
            }
    finally:
        conn.close()

    return render_template(
        "program.html",
        program=program,
        tuition=tuition,
        requirements=requirements,
        scholarships=scholarships,
        exam_results=exam_results,
        user=get_session_user()
    )

@features_bp.route("/compare")
def compare_page():
    return render_template("compare.html", user=get_session_user())

@features_bp.route("/bookmark")
def bookmark_page():
    if "user_id" not in session:
        return redirect("/login")

    conn = db_queries.get_db_connection()
    try:
        with conn.cursor() as cursor:
            programs = db_queries.fetch_user_bookmarks(cursor, session["user_id"])
    finally:
        conn.close()

    return render_template(
        "bookmark.html",
        programs=programs,
        user=get_session_user()
    )

@features_bp.route("/university/<int:university_id>")
def university_page(university_id):
    conn = db_queries.get_db_connection()
    try:
        with conn.cursor() as cursor:
            university = db_queries.fetch_university_details(cursor, university_id)
            programs = db_queries.fetch_programs_by_university(cursor, university_id)

            tuition_range = db_queries.fetch_university_tuition_range(cursor, university_id)
            requirements = db_queries.fetch_university_requirements(cursor, university_id)
            scholarships = db_queries.fetch_university_scholarships(cursor, university_id)
    finally:
        conn.close()

    return render_template(
        "university.html",
        university=university,
        programs=programs,
        tuition_range=tuition_range,
        requirements=requirements,
        scholarships=scholarships,
        user=get_session_user()
    )

# --- API Routes ---

@features_bp.route("/api/programs/search", methods=["GET"])
def api_search_programs():
    q = request.args.get("q", "").strip()

    if not q:
        return jsonify([])

    conn = db_queries.get_db_connection()
    try:
        with conn.cursor() as cursor:
            results = db_queries.search_programs(cursor, q)
    finally:
        conn.close()

    return jsonify(results)

@features_bp.route("/api/program/<int:program_id>", methods=["GET"])
def program_details(program_id):
    conn = db_queries.get_db_connection()
    try:
        with conn.cursor() as cursor:
            program = db_queries.fetch_program_details_ssr(cursor, program_id)
    finally:
        conn.close()

    if program:
        return jsonify(program)
    else:
        return jsonify({}), 404


@features_bp.route("/api/program/<int:program_id>/exam-results", methods=["GET"])
def program_exam_results(program_id):
    # This route is no longer strictly needed for the page load,
    # but can be kept for dynamic chart updates if needed.
    return jsonify([])

@features_bp.route("/api/compare", methods=["POST"])
def compare_programs():
    data = request.json
    program_ids = data.get("program_ids", [])
    return jsonify([])

@features_bp.route("/api/bookmark", methods=["POST"])
def bookmark_program():
    if "user_id" not in session:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.json
    program_id = data.get("program_id")

    if not program_id:
        return jsonify({"error": "Missing program_id"}), 400

    user_id = session["user_id"]

    conn = db_queries.get_db_connection()
    try:
        with conn.cursor() as cursor:
            if db_queries.is_program_bookmarked(cursor, user_id, program_id):
                db_queries.remove_bookmark(cursor, user_id, program_id)
                action = "removed"
            else:
                db_queries.add_bookmark(cursor, user_id, program_id)
                action = "added"

        conn.commit()
    finally:
        conn.close()

    return jsonify({"success": True, "action": action})

@features_bp.route("/api/user/bookmarks", methods=["GET"])
def get_bookmarks():
    if "user_id" not in session:
        return jsonify([])

    user_id = session["user_id"]

    conn = db_queries.get_db_connection()
    try:
        with conn.cursor() as cursor:
            bookmarks = db_queries.fetch_user_bookmarks(cursor, user_id)
    finally:
        conn.close()

    return jsonify(bookmarks)

@features_bp.route("/api/user/bookmarked-ids", methods=["GET"])
def get_bookmarked_ids():
    if "user_id" not in session:
        return jsonify([])

    user_id = session["user_id"]

    conn = db_queries.get_db_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute(
                "SELECT program_id FROM user_bookmarks WHERE user_id = %s",
                (user_id,)
            )
            rows = cursor.fetchall()
    finally:
        conn.close()

    return jsonify([r["program_id"] for r in rows])

@features_bp.route("/api/activity/view", methods=["POST"])
def log_activity():
    if "user_id" not in session:
        return jsonify({"success": False})
    return jsonify({"success": True})

@features_bp.route("/api/clear-data", methods=["GET"])
def clear_data():
    conn = db_queries.get_db_connection()
    try:
        db_queries.reinitialize_database(conn)
        return "Database cleared and re-initialized."
    finally:
        conn.close()

@features_bp.route("/logout")
def logout():
    session.clear()
    return redirect("/login")

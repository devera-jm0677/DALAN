from flask import Blueprint, jsonify, session, render_template, redirect
import db_queries
from flask import request
from db_queries import get_db_connection, fetch_compare_programs_by_year, fetch_compare_programs_all_years
from db_queries import fetch_top_programs_by_year, fetch_top_programs_all_years
from db_queries import fetch_top_universities_by_year, fetch_top_universities_all_years
from db_queries import fetch_universities_for_homescreen


def normalize_interest_terms(interest_names):
    terms = set()
    for name in interest_names or []:
        if not name:
            continue
        cleaned = name.strip()
        if cleaned.lower() in ("others", "any"):
            continue
        terms.add(cleaned)

        upper = cleaned.upper()
        for prefix in ("BS ", "BS", "B.S. ", "B.S."):
            if upper.startswith(prefix):
                base = cleaned[len(prefix):].strip()
                if base:
                    terms.add(base)
                break
    return sorted(terms)


def build_program_filter_chain(
    interest_terms,
    municipality_id,
    institution_type_id,
    budget_min,
    budget_max
):
    chain = []

    if interest_terms:
        chain.append((interest_terms, municipality_id, institution_type_id, budget_min, budget_max))
        if budget_min is not None or budget_max is not None:
            chain.append((interest_terms, municipality_id, institution_type_id, None, None))
        if institution_type_id:
            chain.append((interest_terms, municipality_id, None, None, None))
        if municipality_id:
            chain.append((interest_terms, None, None, None, None))
        chain.append((interest_terms, None, None, None, None))

    if municipality_id or institution_type_id or (budget_min is not None or budget_max is not None):
        chain.append((None, municipality_id, institution_type_id, budget_min, budget_max))
        if budget_min is not None or budget_max is not None:
            chain.append((None, municipality_id, institution_type_id, None, None))
        if institution_type_id:
            chain.append((None, municipality_id, None, None, None))

    seen = set()
    unique = []
    for terms, muni, inst, bmin, bmax in chain:
        terms_key = tuple(terms) if terms else None
        key = (terms_key, muni, inst, bmin, bmax)
        if key in seen:
            continue
        seen.add(key)
        unique.append((terms, muni, inst, bmin, bmax))
    return unique


def fetch_personalized_programs(
    cursor,
    interest_terms,
    municipality_id,
    institution_type_id,
    budget_min,
    budget_max
):
    for terms, muni, inst, bmin, bmax in build_program_filter_chain(
        interest_terms, municipality_id, institution_type_id, budget_min, budget_max
    ):
        programs = db_queries.fetch_program_recommendations_for_preferences(
            cursor,
            interest_terms=terms,
            municipality_id=muni,
            institution_type_id=inst,
            budget_min=bmin,
            budget_max=bmax
        )
        if programs:
            return programs, True

    return [], False


def fetch_personalized_universities(
    cursor,
    interest_terms,
    municipality_id,
    institution_type_id,
    budget_min,
    budget_max
):
    for terms, muni, inst, bmin, bmax in build_program_filter_chain(
        interest_terms, municipality_id, institution_type_id, budget_min, budget_max
    ):
        universities = db_queries.fetch_university_recommendations_for_preferences(
            cursor,
            interest_terms=terms,
            municipality_id=muni,
            institution_type_id=inst,
            budget_min=bmin,
            budget_max=bmax
        )
        if universities:
            return universities, True

    return [], False


dashboard_bp = Blueprint('dashboard_bp', __name__)

# --- SSR Page Routes ---

@dashboard_bp.route("/")
@dashboard_bp.route("/dashboard")
def dashboard_page():
    conn = db_queries.get_db_connection()
    personalized_programs = False
    personalized_universities = False

    try:
        with conn.cursor() as cursor:
            programs = []
            universities = []

            if "user_id" in session:
                user_id = session["user_id"]
                profile = db_queries.fetch_user_profile(cursor, user_id)
                interest_names = db_queries.fetch_user_interest_program_names(cursor, user_id)
                interest_terms = normalize_interest_terms(interest_names)

                municipality_id = profile["municipality_id"] if profile else None
                institution_type_id = profile["preferred_institution_type"] if profile else None
                if institution_type_id == 4:
                    institution_type_id = None

                budget_min = None
                budget_max = None
                if profile and profile.get("budget_id"):
                    budget_range = db_queries.fetch_budget_range(cursor, profile["budget_id"])
                    if budget_range:
                        budget_min = budget_range["min_amount"]
                        budget_max = budget_range["max_amount"]

                has_preferences = bool(
                    interest_terms
                    or municipality_id
                    or institution_type_id
                    or (profile and profile.get("budget_id"))
                )

                if has_preferences:
                    programs, personalized_programs = fetch_personalized_programs(
                        cursor,
                        interest_terms=interest_terms,
                        municipality_id=municipality_id,
                        institution_type_id=institution_type_id,
                        budget_min=budget_min,
                        budget_max=budget_max
                    )
                    universities, personalized_universities = fetch_personalized_universities(
                        cursor,
                        interest_terms=interest_terms,
                        municipality_id=municipality_id,
                        institution_type_id=institution_type_id,
                        budget_min=budget_min,
                        budget_max=budget_max
                    )

            if not programs:
                programs = db_queries.fetch_program_recommendations(cursor)
            if not universities:
                universities = fetch_universities_for_homescreen(cursor)
    finally:
        conn.close()

    user = None
    if "user_id" in session:
        user = {
            "first_name": session.get("first_name"),
            "email": session.get("email"),
            "profile_image": session.get("profile_image")
        }

    return render_template(
        "homescreen.html",
        programs=programs,
        universities=universities,
        user=user,
        personalized_programs=personalized_programs,
        personalized_universities=personalized_universities
    )

# --- API Routes ---
@dashboard_bp.route("/api/programs/by-ids", methods=["GET"])
def programs_by_ids():
    ids = request.args.get("ids", "")
    if not ids:
        return jsonify([])

    try:
        program_ids = [int(i) for i in ids.split(",") if i.isdigit()]
    except ValueError:
        return jsonify([])

    conn = db_queries.get_db_connection()
    try:
        with conn.cursor() as cursor:
            programs = db_queries.fetch_programs_by_ids(cursor, program_ids)
            return jsonify(programs)
    finally:
        conn.close()

@dashboard_bp.route("/api/compare/programs")
def api_compare_programs():
    ids = request.args.get("ids", "")
    year = request.args.get("year")

    program_ids = [int(i) for i in ids.split(",") if i.isdigit()]

    if not program_ids or not year:
        return jsonify([])

    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            if year == "all":
                programs = fetch_compare_programs_all_years(cursor, program_ids)
            else:
                try:
                    year_value = int(year)
                except (TypeError, ValueError):
                    return jsonify([])
                programs = fetch_compare_programs_by_year(
                    cursor,
                    program_ids,
                    year_value
                )
            return jsonify(programs)
    finally:
        conn.close()

@dashboard_bp.route("/api/graph/top-programs/<year>", methods=["GET"])
def top_programs(year):
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            if year == "all":
                data = fetch_top_programs_all_years(cursor)
            else:
                try:
                    year_value = int(year)
                except (TypeError, ValueError):
                    return jsonify([])
                data = fetch_top_programs_by_year(cursor, year_value)
            return jsonify(data)
    finally:
        conn.close()

@dashboard_bp.route("/api/graph/top-universities/<year>", methods=["GET"])
def top_universities(year):
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            if year == "all":
                data = fetch_top_universities_all_years(cursor)
            else:
                try:
                    year_value = int(year)
                except (TypeError, ValueError):
                    return jsonify([])
                data = fetch_top_universities_by_year(cursor, year_value)
            return jsonify(data)
    finally:
        conn.close()

@dashboard_bp.route("/api/notifications", methods=["GET"])
def notifications():
    if "user_id" not in session:
        return jsonify([])

    # TODO: fetch notifications
    return jsonify([])

from flask import Blueprint, jsonify, session, render_template

dashboard_bp = Blueprint('dashboard_bp', __name__)

# --- SSR Page Routes ---

@dashboard_bp.route("/")
@dashboard_bp.route("/dashboard")
def dashboard_page():
    return render_template("homescreen.html")

# --- API Routes ---

@dashboard_bp.route("/api/graph/top-programs/<int:year>", methods=["GET"])
def top_programs(year):
    # TODO: implement GRAPH 1 query
    return jsonify([])


@dashboard_bp.route("/api/graph/top-universities/<int:year>", methods=["GET"])
def top_universities(year):
    # TODO: implement GRAPH 2 query
    return jsonify([])


@dashboard_bp.route("/api/notifications", methods=["GET"])
def notifications():
    if "user_id" not in session:
        return jsonify([])

    # TODO: fetch notifications
    return jsonify([])

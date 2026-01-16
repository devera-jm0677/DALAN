from flask import render_template, redirect, session, Blueprint, jsonify, request
import db_queries
import os
from werkzeug.security import generate_password_hash
from werkzeug.utils import secure_filename

user_profile_bp = Blueprint('user_profile_bp', __name__)

# ---------------------------
# SSR PAGE
# ---------------------------
@user_profile_bp.route("/user-profile")
def user_profile_page():
    if "user_id" not in session:
        return redirect("/login")

    conn = db_queries.get_db_connection()
    cursor = conn.cursor()

    user = db_queries.fetch_user_basic_info(cursor, session["user_id"])
    profile = db_queries.fetch_user_profile(cursor, session["user_id"])
    interests = db_queries.fetch_user_interests(cursor, session["user_id"])
    bookmarks = db_queries.fetch_user_bookmarks(cursor, session["user_id"])

    # ---- DASHBOARD METRICS ----
    bookmark_count = len(bookmarks)

    preferred_location = (
        profile["municipality"]
        if profile and profile.get("municipality")
        else None
    )

    strand_name = (
        profile["strand_name"]
        if profile and profile.get("strand_name")
        else None
    )

    recent_views = bookmarks[:2]   # reuse bookmarks as "history"

    conn.close()

    return render_template(
        "user-profile.html",
        user=user,
        profile=profile,
        interests=interests,
        bookmark_count=bookmark_count,
        preferred_location=preferred_location,
        strand_name=strand_name,
        recent_views=recent_views,
        recent_bookmarks=recent_views
    )

@user_profile_bp.route("/user-profile/update", methods=["POST"])
def update_user_profile():
    if "user_id" not in session:
        return redirect("/login")

    user_id = session["user_id"]

    first_name = request.form.get("first_name")
    last_name = request.form.get("last_name")
    municipality = request.form.get("municipality")
    institution_type = request.form.get("institution_type")

    conn = db_queries.get_db_connection()
    cursor = conn.cursor()

    # Update USERS table
    db_queries.update_user_names(cursor, user_id, first_name, last_name)

    # Update or insert PROFILE
    db_queries.upsert_user_profile(
        cursor,
        user_id,
        municipality,
        institution_type
    )

    conn.commit()
    conn.close()

    return redirect("/user-profile")

# ---------------------------
# API: USER PROFILE DATA
# ---------------------------
@user_profile_bp.route("/api/user/profile")
def api_user_profile():
    if "user_id" not in session:
        return jsonify({"error": "Unauthorized"}), 401

    conn = db_queries.get_db_connection()
    cursor = conn.cursor()

    user = db_queries.fetch_user_basic_info(cursor, session["user_id"])
    profile = db_queries.fetch_user_profile(cursor, session["user_id"])
    interests = db_queries.fetch_user_interests(cursor, session["user_id"])
    bookmarks = db_queries.fetch_user_bookmarks(cursor, session["user_id"])

    conn.close()

    return jsonify({
        "user": user,
        "profile": profile,
        "interests": interests,
        "bookmark_count": len(bookmarks),
        "recent_bookmarks": bookmarks[:2]
    })

@user_profile_bp.route("/api/user/account", methods=["POST"])
def update_account():
    if "user_id" not in session:
        return jsonify({"error": "Unauthorized"}), 401

    user_id = session["user_id"]

    first_name = request.form.get("firstName")
    last_name = request.form.get("lastName")
    email = request.form.get("email")
    password = request.form.get("password")
    image = request.files.get("profilePicture")

    conn = db_queries.get_db_connection()
    cursor = conn.cursor()

    # Email uniqueness check
    if db_queries.is_email_taken(cursor, email, user_id):
        conn.close()
        return jsonify({"error": "Email already in use"}), 400

    profile_picture_url = None

    if image and image.filename:
        filename = secure_filename(image.filename)
        ext = filename.rsplit(".", 1)[-1].lower()

        if ext not in ("jpg", "jpeg", "png", "webp"):
            conn.close()
            return jsonify({"error": "Invalid image type"}), 400

        upload_dir = "static/uploads/profile_pictures"
        os.makedirs(upload_dir, exist_ok=True)

        new_filename = f"user_{user_id}.{ext}"
        image_path = os.path.join(upload_dir, new_filename)
        image.save(image_path)

        profile_picture_url = f"/static/uploads/profile_pictures/{new_filename}"

    # Update account info
    db_queries.update_user_account(
        cursor,
        user_id,
        first_name,
        last_name,
        email,
        profile_picture_url
    )

    session["first_name"] = first_name
    session["email"] = email
    if profile_picture_url:
        session["profile_image"] = profile_picture_url

    # Optional password update
    if password:
        hashed = generate_password_hash(password)
        db_queries.update_user_password(cursor, user_id, hashed)

    conn.commit()
    conn.close()

    return jsonify({"success": True})

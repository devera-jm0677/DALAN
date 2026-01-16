from flask import Flask, redirect, url_for
from flask_cors import CORS
from flask import session

# Import Blueprints
from routes.auth import auth_bp
from routes.setup import setup_bp
from routes.lookup import lookup_bp
from routes.dashboard import dashboard_bp
from routes.features import features_bp
from routes.user_profile import user_profile_bp

app = Flask(__name__)
app.secret_key = "d4l4n"  # change later
CORS(app)

@app.route('/')
def index():
    return redirect(url_for('auth_bp.register_page'))

# Register Blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(setup_bp)
app.register_blueprint(lookup_bp)
app.register_blueprint(dashboard_bp)
app.register_blueprint(features_bp)
app.register_blueprint(user_profile_bp)

# print(app.url_map)

@app.context_processor
def inject_user():
    if "user_id" in session:
        return {
            "user": {
                "first_name": session.get("first_name"),
                "profile_image": session.get("profile_image")
            }
        }
    return {
        "user": None
    }

if __name__ == "__main__":
    app.run(debug=True)

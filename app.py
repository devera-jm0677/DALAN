from flask import Flask
from flask_cors import CORS

# Import Blueprints
from routes.auth import auth_bp
from routes.setup import setup_bp
from routes.lookup import lookup_bp
from routes.dashboard import dashboard_bp
from routes.features import features_bp

app = Flask(__name__)
app.secret_key = "d4l4n"  # change later
CORS(app)

# Register Blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(setup_bp)
app.register_blueprint(lookup_bp)
app.register_blueprint(dashboard_bp)
app.register_blueprint(features_bp)

if __name__ == "__main__":
    app.run(debug=True)
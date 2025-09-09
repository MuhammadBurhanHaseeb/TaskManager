from flask import Flask
from flask_cors import CORS
from routes.auth_routes import auth_bp
from routes.task_routes import task_bp

app = Flask(__name__)
CORS(app, supports_credentials=True)

# Register blueprints
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(task_bp, url_prefix="/tasks")

if __name__ == "__main__":
    app.run(debug=True, port=5000)

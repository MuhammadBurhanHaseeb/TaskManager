from flask import Blueprint, request, jsonify
from controllers.auth_controller import signup_user, login_user, logout_user
from utils.auth_middleware import require_auth

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/signup", methods=["POST"])
def signup():
    body = request.get_json()
    email, password = body.get("email"), body.get("password")
    res = signup_user(email, password)
    if res.user:
        return jsonify({"user": res.user.email}), 201
    return jsonify({"error": str(res)}), 400

@auth_bp.route("/login", methods=["POST"])
def login():
    body = request.get_json()
    email, password = body.get("email"), body.get("password")
    res = login_user(email, password)
    if res.session:
        return jsonify({
            "access_token": res.session.access_token,
            "refresh_token": res.session.refresh_token,
            "user": res.user.email
        }), 200
    return jsonify({"error": str(res)}), 400

@auth_bp.route("/logout", methods=["POST"])
@require_auth
def logout():
    res = logout_user()
    return jsonify({"message": "Logged out"}), 200

from functools import wraps
from flask import request, jsonify, g
from utils.supabase_client import supabase_admin

def require_auth(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        parts = auth_header.split()
        if len(parts) != 2 or parts[0].lower() != "bearer":
            return jsonify({"error": "Missing/invalid Authorization header"}), 401
        token = parts[1]
        try:
            user = supabase_admin.auth.get_user(token)
            g.user_id = user.user.id
            g.token = token
        except Exception:
            return jsonify({"error": "Invalid token"}), 401
        return f(*args, **kwargs)
    return wrapper

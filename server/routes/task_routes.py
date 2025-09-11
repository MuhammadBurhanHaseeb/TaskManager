from flask import Blueprint, request, jsonify, g
from controllers.task_controller import get_tasks, create_task, update_task, delete_task
from utils.auth_middleware import require_auth

task_bp = Blueprint("tasks", __name__)

@task_bp.route("/", methods=["GET"])
@require_auth
def list_tasks():
    status = request.args.get("status")
    res = get_tasks(g.token, status)
    return jsonify(res.data), 200

@task_bp.route("/", methods=["POST"])
@require_auth
def add_task():
    body = request.get_json()
    title, description = body.get("title"), body.get("description")
    res = create_task(g.token, g.user_id, title, description)
    return jsonify(res.data[0] if res.data else {}), 201

@task_bp.route("/<task_id>", methods=["PUT"])
@require_auth
def edit_task(task_id):
    body = request.get_json()
    res = update_task(g.token, task_id, body)
    if not res.data:
        return jsonify({"error": "Not found"}), 404
    return jsonify(res.data[0]), 200

@task_bp.route("/<task_id>", methods=["DELETE"])
@require_auth
def remove_task(task_id):
    delete_task(g.token, task_id)
    return jsonify({"ok": True}), 200

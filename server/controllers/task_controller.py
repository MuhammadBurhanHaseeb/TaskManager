from utils.supabase_client import supabase_for_user

def get_tasks(token, status=None):
    sb = supabase_for_user(token)
    query = sb.table("tasks").select("*").order("created_at")
    if status in ["pending", "completed"]:
        query = query.eq("status", status)
    return query.execute()

def create_task(token, user_id, title, description):
    sb = supabase_for_user(token)
    return sb.table("tasks").insert({
        "title": title,
        "description": description,
        "status": "pending",
        "user_id": user_id
    }).execute()

def update_task(token, task_id, body):
    sb = supabase_for_user(token)
    return sb.table("tasks").update(body).eq("id", task_id).execute()

def delete_task(token, task_id):
    sb = supabase_for_user(token)
    return sb.table("tasks").delete().eq("id", task_id).execute()

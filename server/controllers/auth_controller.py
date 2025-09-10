from utils.supabase_client import SUPABASE_URL, SUPABASE_ANON_KEY, create_client

def getClient():
    client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)
    return client
def signup_user(email, password):
    client = getClient()
    res = client.auth.sign_up({"email": email, "password": password})
    return res
def login_user(email, password):
    client = getClient()
    res = client.auth.sign_in_with_password({"email": email, "password": password})
    return res
def logout_user():
    client = getClient()
    return client.auth.sign_out()
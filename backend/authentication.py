import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

DATABASE = 'data/database.sqlite'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def login_user(username, password, ip):
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE displayname = ?', (username,)).fetchone()
    conn.close()
    if user is None:
        return False, "User not found"
    if not check_password_hash(user['password'], password):
        return False, "Incorrect password"
    # Optionally log IP or update last login time here
    return True, "Login successful"

def signup_user(name, displayname, email, password, newsletter, ip):
    conn = get_db_connection()
    existing_user = conn.execute('SELECT * FROM users WHERE displayname = ? OR email = ?', (displayname, email)).fetchone()
    if existing_user:
        conn.close()
        return False, "User with this display name or email already exists"
    hashed_password = generate_password_hash(password)
    try:
        conn.execute(
            'INSERT INTO users (name, displayname, email, password, newsletter, ip) VALUES (?, ?, ?, ?, ?, ?)',
            (name, displayname, email, hashed_password, int(newsletter), ip)
        )
        conn.commit()
    except Exception as e:
        conn.close()
        return False, f"Database error: {str(e)}"
    conn.close()
    return True, "User created successfully"

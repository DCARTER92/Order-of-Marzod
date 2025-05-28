from flask import Flask, render_template, request, redirect, url_for, jsonify
import sqlite3
from backend import authentication
from datetime import datetime

app = Flask(__name__)

DATABASE = 'data/database.sqlite'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
    ''')
    conn.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            displayname TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            newsletter INTEGER NOT NULL,
            ip TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

@app.before_request
def initialize():
    init_db()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    data = request.form
    username = data.get('username')
    password = data.get('password')
    ip = request.remote_addr
    success, message = authentication.login_user(username, password, ip)
    if success:
        return jsonify({'status': 'success', 'message': message})
    else:
        return jsonify({'status': 'error', 'message': message}), 401

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'GET':
        return render_template('signup.html')
    data = request.form
    name = data.get('name')
    displayname = data.get('displayname')
    email = data.get('email')
    password = data.get('password')
    newsletter = data.get('newsletter') == 'yes'
    ip = request.remote_addr
    success, message = authentication.signup_user(name, displayname, email, password, newsletter, ip)
    if success:
        return redirect(url_for('home'))
    else:
        return jsonify({'status': 'error', 'message': message}), 400

@app.route('/api/posts', methods=['GET', 'POST'])
def posts():
    conn = get_db_connection()
    if request.method == 'GET':
        posts = conn.execute('SELECT * FROM posts ORDER BY created_at DESC').fetchall()
        conn.close()
        posts_list = [{'id': post['id'], 'content': post['content'], 'created_at': post['created_at']} for post in posts]
        return jsonify(posts_list)
    elif request.method == 'POST':
        data = request.get_json()
        content = data.get('content')
        if not content:
            return jsonify({'error': 'Content is required'}), 400
        created_at = datetime.utcnow().isoformat()
        conn.execute('INSERT INTO posts (content, created_at) VALUES (?, ?)', (content, created_at))
        conn.commit()
        conn.close()
        return jsonify({'status': 'success', 'message': 'Post created'}), 201

if __name__ == '__main__':
    app.run(debug=True)

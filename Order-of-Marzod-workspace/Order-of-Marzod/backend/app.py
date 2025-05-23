from flask import Flask, render_template, request, redirect, url_for, jsonify
import sqlite3
from backend import authentication

app = Flask(__name__)

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

@app.route('/signup', methods=['POST'])
def signup():
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

if __name__ == '__main__':
    app.run(debug=True)

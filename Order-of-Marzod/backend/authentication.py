from flask import Flask, request, session, redirect, url_for, render_template
import sqlite3
import hashlib

app = Flask(__name__)
app.secret_key = "supersecretkey"

@app.route('/signup', methods=['POST'])
def signup():
    username = request.form['username']
    password = hashlib.sha256(request.form['password'].encode()).hexdigest()
    email = request.form['email']
    ip_address = request.remote_addr

    con = sqlite3.connect("data/database.sqlite")
    cur = con.cursor()
    cur.execute("INSERT INTO users (username, password, email, ip_address) VALUES (?, ?, ?, ?)", 
                (username, password, email, ip_address))
    con.commit()
    con.close()
    
    return redirect(url_for('login'))

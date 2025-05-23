from flask import Flask, request, session, redirect, url_for
import sqlite3

app = Flask(__name__)

@app.route('/ban_user', methods=['POST'])
def ban_user():
    if 'admin' in session:
        user_id = request.form['user_id']
        con = sqlite3.connect("data/database.sqlite")
        cur = con.cursor()
        cur.execute("UPDATE users SET banned=? WHERE id=?", (True, user_id))
        con.commit()
        con.close()
        return redirect(url_for('admin-dashboard'))
    return "Unauthorized", 403

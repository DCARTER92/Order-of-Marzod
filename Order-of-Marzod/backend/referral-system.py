import sqlite3
from flask import Flask, request, redirect, url_for

app = Flask(__name__)

@app.route('/generate_referral', methods=['POST'])
def generate_referral():
    user_id = request.form['user_id']
    referral_code = "REF" + str(user_id)

    con = sqlite3.connect("data/database.sqlite")
    cur = con.cursor()
    cur.execute("UPDATE users SET referral_code=? WHERE id=?", (referral_code, user_id))
    con.commit()
    con.close()

    return referral_code

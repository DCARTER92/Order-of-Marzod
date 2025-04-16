# Order of Marzod

## 🚀 How to Use

### Frontend (GitHub Pages)
1. Push the `frontend/` folder to a GitHub repo.
2. Go to Repo Settings → Pages → Select `/frontend` as the source.
3. Your site will be live!

### Backend (Flask)
1. Use [Replit](https://replit.com/) or [Render](https://render.com/) to host the backend.
2. Copy all files in `backend/` to your Replit project.
3. Install Flask (`pip install flask flask-mail`), then run `app.py`.

### Notes
- The site includes signup/login, referral system, banning tools, and styled UI.
- Email alerts require SMTP credentials (see `send_ban_email()` in Flask code).
- SQLite database is pre-wired.
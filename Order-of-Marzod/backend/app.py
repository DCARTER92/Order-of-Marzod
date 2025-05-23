from flask import Flask, render_template, send_from_directory, abort, request, jsonify
import os
from datetime import datetime
import threading

app = Flask(__name__, static_folder='../public', template_folder='../public')

# In-memory storage for posts and comments
posts = []
posts_lock = threading.Lock()
post_id_counter = 1
comment_id_counter = 1

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/<path:filename>')
def serve_page(filename):
    public_path = os.path.join(app.root_path, '../public')
    # Check if the requested file is an HTML file in the public folder or subfolders
    if filename.endswith('.html'):
        # Try to render as template
        try:
            return render_template(filename)
        except:
            abort(404)
    else:
        # Serve static files (css, js, images)
        return send_from_directory(public_path, filename)

# API to submit a new post
@app.route('/api/posts', methods=['POST'])
def submit_post():
    global post_id_counter
    data = request.get_json()
    content = data.get('content', '').strip()
    if not content:
        return jsonify({'error': 'Post content cannot be empty'}), 400
    with posts_lock:
        post = {
            'id': post_id_counter,
            'content': content,
            'timestamp': datetime.utcnow().isoformat() + 'Z',
            'comments': []
        }
        posts.insert(0, post)  # Insert at beginning for newest first
        post_id_counter += 1
    return jsonify(post), 201

# API to get all posts with comments
@app.route('/api/posts', methods=['GET'])
def get_posts():
    with posts_lock:
        return jsonify(posts)

# API to submit a comment to a post
@app.route('/api/posts/<int:post_id>/comments', methods=['POST'])
def submit_comment(post_id):
    global comment_id_counter
    data = request.get_json()
    content = data.get('content', '').strip()
    if not content:
        return jsonify({'error': 'Comment content cannot be empty'}), 400
    with posts_lock:
        for post in posts:
            if post['id'] == post_id:
                comment = {
                    'id': comment_id_counter,
                    'content': content,
                    'timestamp': datetime.utcnow().isoformat() + 'Z'
                }
                post['comments'].append(comment)
                comment_id_counter += 1
                return jsonify(comment), 201
    return jsonify({'error': 'Post not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)

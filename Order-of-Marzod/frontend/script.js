// Basic JavaScript for Order of Marzod

document.addEventListener('DOMContentLoaded', () => {
    console.log('Order of Marzod frontend loaded');

    // Community page post submission and display logic
    const postInput = document.getElementById('postInput');
    const submitPostBtn = document.getElementById('submitPost');
    const postsSection = document.getElementById('postsSection');

    if (postInput && submitPostBtn && postsSection) {
        // Fetch and display posts on page load
        fetchPosts();

        // Submit new post
        submitPostBtn.addEventListener('click', () => {
            const content = postInput.value.trim();
            if (!content) {
                alert('Please enter some text to post.');
                return;
            }
            fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content })
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => { throw new Error(data.error || 'Failed to submit post'); });
                }
                return response.json();
            })
            .then(post => {
                postInput.value = '';
                prependPost(post);
            })
            .catch(err => alert(err.message));
        });

        // Fetch posts from backend
        function fetchPosts() {
            fetch('/api/posts')
                .then(response => response.json())
                .then(posts => {
                    postsSection.innerHTML = '';
                    posts.forEach(post => {
                        appendPost(post);
                    });
                })
                .catch(err => {
                    postsSection.innerHTML = '<p>Error loading posts.</p>';
                    console.error(err);
                });
        }

        // Create post element and append to postsSection
        function appendPost(post) {
            const postElem = createPostElement(post);
            postsSection.appendChild(postElem);
        }

        // Create post element and prepend to postsSection
        function prependPost(post) {
            const postElem = createPostElement(post);
            postsSection.insertBefore(postElem, postsSection.firstChild);
        }

        // Create a post DOM element with comments and comment form
        function createPostElement(post) {
            const postDiv = document.createElement('div');
            postDiv.className = 'post';
            postDiv.style.border = '1px solid #ccc';
            postDiv.style.padding = '10px';
            postDiv.style.marginBottom = '15px';
            postDiv.style.backgroundColor = '#fff';

            const contentP = document.createElement('p');
            contentP.textContent = post.content;
            postDiv.appendChild(contentP);

            const timestampP = document.createElement('p');
            timestampP.style.fontSize = '0.8em';
            timestampP.style.color = '#666';
            timestampP.textContent = `Posted on: ${new Date(post.timestamp).toLocaleString()}`;
            postDiv.appendChild(timestampP);

            // Comments container
            const commentsDiv = document.createElement('div');
            commentsDiv.className = 'comments';
            commentsDiv.style.marginTop = '10px';
            commentsDiv.style.paddingLeft = '15px';
            commentsDiv.style.borderLeft = '2px solid #ddd';

            // Existing comments
            if (post.comments && post.comments.length > 0) {
                post.comments.forEach(comment => {
                    const commentDiv = document.createElement('div');
                    commentDiv.className = 'comment';
                    commentDiv.style.marginBottom = '8px';

                    const commentContent = document.createElement('p');
                    commentContent.textContent = comment.content;
                    commentContent.style.margin = '0';
                    commentDiv.appendChild(commentContent);

                    const commentTimestamp = document.createElement('p');
                    commentTimestamp.style.fontSize = '0.7em';
                    commentTimestamp.style.color = '#999';
                    commentTimestamp.textContent = `Commented on: ${new Date(comment.timestamp).toLocaleString()}`;
                    commentDiv.appendChild(commentTimestamp);

                    commentsDiv.appendChild(commentDiv);
                });
            }

            postDiv.appendChild(commentsDiv);

            // Comment input box
            const commentInput = document.createElement('input');
            commentInput.type = 'text';
            commentInput.placeholder = 'Add a comment...';
            commentInput.style.width = '80%';
            commentInput.style.padding = '5px';
            commentInput.style.marginTop = '10px';
            commentInput.style.marginRight = '5px';

            // Comment submit button
            const commentSubmitBtn = document.createElement('button');
            commentSubmitBtn.textContent = 'Submit';
            commentSubmitBtn.style.padding = '5px 10px';
            commentSubmitBtn.style.cursor = 'pointer';

            // Comment form container
            const commentFormDiv = document.createElement('div');
            commentFormDiv.style.marginTop = '10px';
            commentFormDiv.appendChild(commentInput);
            commentFormDiv.appendChild(commentSubmitBtn);

            postDiv.appendChild(commentFormDiv);

            // Handle comment submission
            commentSubmitBtn.addEventListener('click', () => {
                const commentText = commentInput.value.trim();
                if (!commentText) {
                    alert('Please enter a comment.');
                    return;
                }
                fetch(`/api/posts/${post.id}/comments`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ content: commentText })
                })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(data => { throw new Error(data.error || 'Failed to submit comment'); });
                    }
                    return response.json();
                })
                .then(comment => {
                    // Add new comment to commentsDiv
                    const commentDiv = document.createElement('div');
                    commentDiv.className = 'comment';
                    commentDiv.style.marginBottom = '8px';

                    const commentContent = document.createElement('p');
                    commentContent.textContent = comment.content;
                    commentContent.style.margin = '0';
                    commentDiv.appendChild(commentContent);

                    const commentTimestamp = document.createElement('p');
                    commentTimestamp.style.fontSize = '0.7em';
                    commentTimestamp.style.color = '#999';
                    commentTimestamp.textContent = `Commented on: ${new Date(comment.timestamp).toLocaleString()}`;
                    commentDiv.appendChild(commentTimestamp);

                    commentsDiv.appendChild(commentDiv);

                    commentInput.value = '';
                })
                .catch(err => alert(err.message));
            });

            return postDiv;
        }
    }
});

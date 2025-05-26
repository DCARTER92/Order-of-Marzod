document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const loginPopup = document.getElementById('loginPopup');
    const closePopup = document.getElementById('closePopup');

    loginBtn.addEventListener('click', () => {
        loginPopup.classList.remove('hidden');
    });

    closePopup.addEventListener('click', () => {
        loginPopup.classList.add('hidden');
    });

    // Close popup if clicking outside the popup content
    loginPopup.addEventListener('click', (e) => {
        if (e.target === loginPopup) {
            loginPopup.classList.add('hidden');
        }
    });

    // Community post form handling
    const postForm = document.getElementById('postForm');
    const postsContainer = document.getElementById('postsContainer');

    // Fetch posts from backend
    async function fetchPosts() {
        try {
            const response = await fetch('/api/posts');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            posts = data;
            renderPosts();
        } catch (error) {
            console.error('Error fetching posts:', error);
            postsContainer.innerHTML = '<p>Failed to load posts.</p>';
        }
    }

    // Render posts to the page
    function renderPosts() {
        postsContainer.innerHTML = '';
        if (!posts || posts.length === 0) {
            postsContainer.innerHTML = '<p>No posts yet. Be the first to post!</p>';
            return;
        }
        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');
            postDiv.textContent = post.content;
            postsContainer.appendChild(postDiv);
        });
    }

    // Handle new post submission
    postForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const postContent = document.getElementById('postContent').value.trim();
        if (!postContent) return;

        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: postContent })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            console.log(result.message);
            postForm.reset();
            fetchPosts();
        } catch (error) {
            console.error('Error posting:', error);
        }
    });

    let posts = [];
    fetchPosts();
});

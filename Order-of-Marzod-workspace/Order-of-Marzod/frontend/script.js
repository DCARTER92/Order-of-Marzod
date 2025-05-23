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

    // Placeholder posts array
    let posts = [];

    function renderPosts() {
        postsContainer.innerHTML = '';
        if (posts.length === 0) {
            postsContainer.innerHTML = '<p>No posts yet. Be the first to post!</p>';
            return;
        }
        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');
            postDiv.textContent = post;
            postsContainer.appendChild(postDiv);
        });
    }

    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const postContent = document.getElementById('postContent').value.trim();
        if (postContent) {
            posts.push(postContent);
            renderPosts();
            postForm.reset();
        }
    });

    renderPosts();
});

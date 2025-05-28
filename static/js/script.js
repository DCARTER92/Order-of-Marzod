document.addEventListener("DOMContentLoaded", () => {
  // Get DOM elements
  const loginBtn = document.getElementById('loginBtn');
  const loginPopup = document.getElementById('loginPopup');
  const closePopup = document.getElementById('closePopup');
  const loginForm = document.getElementById('loginForm');

  // Show popup on login button click
  if (loginBtn && loginPopup) {
    loginBtn.addEventListener('click', () => {
      loginPopup.classList.remove('hidden');
    });
  }

  // Close popup on close button click
  if (closePopup && loginPopup) {
    closePopup.addEventListener('click', () => {
      loginPopup.classList.add('hidden');
    });
  }

  // Close popup when clicking outside
  if (loginPopup) {
    loginPopup.addEventListener('click', (e) => {
      if (e.target === loginPopup) {
        loginPopup.classList.add('hidden');
      }
    });
  }

  // Handle login form submission
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(loginForm);
      try {
        const response = await fetch('/login', {
          method: 'POST',
          body: formData
        });
        
        const data = await response.json();
        
        if (response.ok) {
          // Redirect to home page on successful login
          window.location.href = '/';
        } else {
          // Show error message
          alert(data.message || 'Login failed. Please try again.');
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred. Please try again.');
      }
    });
  }
});

// Fireflies animation initialization
console.log("🔥 Fireflies animation initialized!");

document.addEventListener("DOMContentLoaded", () => {
  console.log("✨ Fireflies are now animating!");

  // Create login popup container
  const loginPopup = document.createElement('div');
  loginPopup.id = 'loginPopup';
  loginPopup.style.display = 'none';
  loginPopup.style.position = 'fixed';
  loginPopup.style.top = '50%';
  loginPopup.style.left = '50%';
  loginPopup.style.transform = 'translate(-50%, -50%)';
  loginPopup.style.backgroundColor = 'white';
  loginPopup.style.padding = '20px';
  loginPopup.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
  loginPopup.style.zIndex = '1000';

  loginPopup.innerHTML = `
    <h2>Login</h2>
    <form id="popupLoginForm" method="POST" action="/login">
      <label for="popupDisplayname">Display Name:</label><br/>
      <input type="text" id="popupDisplayname" name="displayname" required /><br/>
      <label for="popupPassword">Password:</label><br/>
      <input type="password" id="popupPassword" name="password" required /><br/><br/>
      <button type="submit">Login</button>
      <button type="button" id="closePopupBtn">Cancel</button>
    </form>
    <p>Don't have an account? <a href="signup/signup.html">Sign up here</a></p>
  `;

  document.body.appendChild(loginPopup);

  // Show popup on login button click
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      loginPopup.style.display = 'block';
    });
  }

  // Close popup on cancel button click
  const closePopupBtn = document.getElementById('closePopupBtn');
  if (closePopupBtn) {
    closePopupBtn.addEventListener('click', () => {
      loginPopup.style.display = 'none';
    });
  }

  // Optional: handle form submission via AJAX here if desired
});

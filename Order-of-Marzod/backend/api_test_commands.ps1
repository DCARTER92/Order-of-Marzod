# Updated PowerShell script to use HTTPS for local testing if applicable

# Note: For local testing, HTTPS might not be set up. 
# When deploying, update URLs to use HTTPS.

# Test login
Invoke-RestMethod -Uri http://127.0.0.1:5000/login -Method POST -ContentType "application/x-www-form-urlencoded" -Body @{username='testuser'; password='testpass'}

# Test signup
Invoke-RestMethod -Uri http://127.0.0.1:5000/signup -Method POST -ContentType "application/x-www-form-urlencoded" -Body @{
    name='Test User';
    displayname='testuser';
    email='testuser@example.com';
    password='testpass';
    newsletter='yes'
}

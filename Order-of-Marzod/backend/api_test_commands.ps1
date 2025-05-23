  # PowerShell script to test login and signup endpoints with form data

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

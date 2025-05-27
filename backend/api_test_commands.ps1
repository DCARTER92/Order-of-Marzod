# PowerShell commands to test login and signup endpoints

# Test login
Invoke-RestMethod -Uri http://127.0.0.1:5000/login -Method POST -Body @{username='testuser'; password='testpass'} -ContentType 'application/x-www-form-urlencoded'

# Test signup
Invoke-RestMethod -Uri http://127.0.0.1:5000/signup -Method POST -Body @{name='Test User'; displayname='testuser'; email='test@example.com'; password='testpass'; newsletter='yes'} -ContentType 'application/x-www-form-urlencoded'

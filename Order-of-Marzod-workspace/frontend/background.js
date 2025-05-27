const canvas = document.getElementById("background-canvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Parameters for the scene
const windSpeed = 2;
const ashRate = 0.1;
const seaWaveHeight = 10;

// Load resources
const personImg = new Image();
personImg.src = '/backend/static/background/icon.jpg';  // Using existing local image in backend static folder
personImg.onload = () => {
    animate();
};

let windAngle = 0;

// Utility function to create a glowing sky
function drawSky() {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "darkred");
    gradient.addColorStop(0.5, "darkgray");
    gradient.addColorStop(1, "black");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add glowing clouds
    drawClouds();
}

// Utility function to create glowing, apocalyptic clouds
function drawClouds() {
    const cloudDensity = 0.05;
    const numClouds = canvas.width * canvas.height * cloudDensity;

    for (let i = 0; i < numClouds; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height / 2;
        const size = Math.random() * 200 + 50;

        ctx.globalAlpha = 0.3 + Math.random() * 0.7; // Semi-transparent
        ctx.fillStyle = "rgba(255, 69, 0, 1)"; // Glowing orange

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2, false);
        ctx.fill();
    }
}

// Function to simulate the sea with waves
function drawSea() {
    const waveSpeed = 2;
    const waveAmplitude = 30;
    const waveFrequency = 0.03;

    ctx.fillStyle = "#001f2d";  // Dark sea color
    ctx.beginPath();
    for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height - Math.sin(x * waveFrequency + waveSpeed) * waveAmplitude;
        ctx.lineTo(x, y);
    }
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fill();
}

// Function to simulate falling ash particles
function drawAsh() {
    ctx.fillStyle = "#4e4e4e"; // Dark ash color

    if (Math.random() < ashRate) {
        const x = Math.random() * canvas.width;
        const y = 0;
        ctx.beginPath();
        ctx.arc(x, y, Math.random() * 2 + 1, 0, Math.PI * 2, false);
        ctx.fill();
    }
}

// Function to animate the person on the cliff
function drawPerson() {
    const personWidth = 80;
    const personHeight = 200;

    const personX = canvas.width / 2 - personWidth / 2;
    const personY = canvas.height - 300;

    ctx.globalAlpha = 0.8;
    ctx.drawImage(personImg, personX, personY, personWidth, personHeight);

    // Animate the hair (wind blowing effect)
    ctx.save();
    ctx.translate(personX + personWidth / 2, personY + personHeight / 2);
    ctx.rotate(windAngle);
    ctx.translate(-personX - personWidth / 2, -personY - personHeight / 2);
    ctx.drawImage(personImg, personX, personY, personWidth, personHeight);
    ctx.restore();
}

// Animation loop
function animate() {
    windAngle += windSpeed * 0.01;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawSky();
    drawSea();
    drawAsh();
    drawPerson();

    requestAnimationFrame(animate);
}

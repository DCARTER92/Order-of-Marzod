// Fireflies animation initialization
console.log("🔥 Fireflies animation initialized!");

document.addEventListener("DOMContentLoaded", () => {
  console.log("✨ Fireflies are now animating!");

  const quantity = 15;
  for (let i = 0; i < quantity; i++) {
    const firefly = document.createElement('div');
    firefly.classList.add('firefly');
    document.body.appendChild(firefly);
  }
});

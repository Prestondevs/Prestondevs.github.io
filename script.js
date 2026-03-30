// script.js
// Adds a subtle terminal cursor-blink effect to the title on load,
// and a small fade-in animation for the post list items.

document.addEventListener('DOMContentLoaded', () => {

  // --- Staggered fade-in for list items ---
  const items = document.querySelectorAll('ul li, .see-more, .rss');

  items.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-6px)';
    el.style.transition = `opacity 0.3s ease ${i * 40}ms, transform 0.3s ease ${i * 40}ms`;
  });

  // Trigger after a tiny delay so the transition fires
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      items.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'translateX(0)';
      });
    });
  });

  // --- Blinking cursor appended to h1 ---
  const h1 = document.querySelector('h1');
  if (h1) {
    const cursor = document.createElement('span');
    cursor.textContent = '_';
    cursor.style.cssText = `
      color: #3ab8a0;
      animation: blink 1s step-start infinite;
      margin-left: 4px;
      font-size: 0.85em;
    `;

    // Inject keyframes if not already present
    if (!document.getElementById('blink-style')) {
      const style = document.createElement('style');
      style.id = 'blink-style';
      style.textContent = `
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    h1.appendChild(cursor);
  }

});
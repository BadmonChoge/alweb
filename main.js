// js/main.js
document.addEventListener('DOMContentLoaded', () => {
  // Initial setup
  setTimeout(() => {
    document.body.classList.add('shrink');
  }, 500);

  // Typewriter Effect
  const hoverText = document.getElementById('hover-text');
  const menuItems = document.querySelectorAll('.menu-row li');
  let typewriterTimeout;

  function typeWriter(element, text, speed = 30) {
    let i = 0;
    element.textContent = '';
    element.style.opacity = '1';
    
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        typewriterTimeout = setTimeout(type, speed);
      }
    }
    clearTimeout(typewriterTimeout);
    type();
  }

  menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      typeWriter(hoverText, item.dataset.text);
    });

    item.addEventListener('mouseleave', () => {
      clearTimeout(typewriterTimeout);
      hoverText.style.opacity = '0';
    });
  });

  // Search Functionality
  const searchIcon = document.getElementById('search-icon');
  let overlay;

  function closeOverlay() {
    if (overlay) {
      document.body.removeChild(overlay);
      overlay = null;
    }
  }

  searchIcon.addEventListener('click', () => {
    closeOverlay();
    
    overlay = document.createElement('div');
    overlay.className = 'search-overlay';
    
    const input = document.createElement('input');
    input.className = 'search-box';
    input.placeholder = 'Search...';
    
    overlay.appendChild(input);
    document.body.appendChild(overlay);
    input.focus();

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeOverlay();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeOverlay();
    }, { once: true });
  });
});

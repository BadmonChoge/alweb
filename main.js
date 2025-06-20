document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');
  const menuBar = document.querySelector('.menu-bar');
  const skyline = document.querySelector('.skyline-container');
  const scrollContent = document.querySelector('.scroll-content');
  const hoverText = document.getElementById('hover-text');
  const navItems = document.querySelectorAll('.menu-row a');
  const searchIcon = document.getElementById('search-icon');
  const searchOverlay = document.getElementById('search-overlay');
  const closeSearch = document.querySelector('.close-search');
  const art = document.querySelector('.word.art');
  const life = document.querySelector('.word.life');

  let typeTimeout;
  let lastScrollPosition = 0;
  let isSearchOpen = false;
  let scrollVelocity = 0;
  let lastScrollTime = performance.now();

  // 🔁 Reset and trigger slide-in animations
  art.style.animation = 'none';
  life.style.animation = 'none';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      art.style.animation = 'slideInLeft 2s forwards';
      life.style.animation = 'slideInRight 2s forwards';
    });
  });

  // ⏳ Shrink + reveal nav/skyline after animation
  setTimeout(() => {
    document.body.classList.add('shrink');
    setTimeout(() => {
      menuBar.style.opacity = '1';
      skyline.style.opacity = '0.8';
    }, 1000);
  }, 3000);

  // 🧠 Hover typing effect
  function typeWriter(element, text, speed = 30) {
    let i = 0;
    element.textContent = '';
    element.style.opacity = '1';
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        typeTimeout = setTimeout(type, speed);
      }
    }
    clearTimeout(typeTimeout);
    type();
  }

  navItems.forEach(item => {
    item.addEventListener('mouseenter', (e) => {
      e.stopPropagation();
      typeWriter(hoverText, item.dataset.text);
    });

    item.addEventListener('mouseleave', () => {
      clearTimeout(typeTimeout);
      hoverText.style.opacity = '0';
    });
  });

  // 🔍 Search overlay behavior
  searchIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    isSearchOpen = true;
    searchOverlay.classList.add('active');
    searchOverlay.querySelector('input').focus();
    hero.style.transition = 'none';
    menuBar.style.transition = 'none';
    skyline.style.transition = 'none';
  });

  closeSearch.addEventListener('click', () => {
    isSearchOpen = false;
    searchOverlay.classList.remove('active');
    setTimeout(() => {
      hero.style.transition = 'opacity 0.4s ease-out';
      menuBar.style.transition = 'opacity 0.4s ease-out';
      skyline.style.transition = 'opacity 0.4s ease-out';
    }, 50);
  });

  searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) {
      isSearchOpen = false;
      searchOverlay.classList.remove('active');
    }
  });

  // 🧭 Scroll behavior for visibility and fading
  window.addEventListener('scroll', () => {
    if (isSearchOpen) return;

    const currentScroll = window.scrollY;
    const currentTime = performance.now();
    const timeDiff = currentTime - lastScrollTime;
    scrollVelocity = Math.abs(currentScroll - lastScrollPosition) / timeDiff;
    const scrollDirection = currentScroll > lastScrollPosition ? 'down' : 'up';

    lastScrollPosition = currentScroll;
    lastScrollTime = currentTime;

    const dynamicThreshold = 50 + (scrollVelocity * 500);

    if (scrollDirection === 'up' && currentScroll > dynamicThreshold) {
      const fadeAmount = Math.min(1, (currentScroll - dynamicThreshold) / 100);
      hero.style.opacity = (1 - fadeAmount).toString();
      menuBar.style.opacity = (1 - fadeAmount).toString();
      skyline.style.opacity = (0.8 - fadeAmount * 0.8).toString();
      scrollContent.classList.add('visible');
    } else if (scrollDirection === 'down' || currentScroll <= dynamicThreshold) {
      hero.style.opacity = '1';
      menuBar.style.opacity = '1';
      skyline.style.opacity = '0.8';
      if (currentScroll <= 10) {
        scrollContent.classList.remove('visible');
      }
    }
  });

  // 📦 Trigger initial scroll state
  window.dispatchEvent(new Event('scroll'));
});

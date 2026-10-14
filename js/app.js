/* ==========================================================================
   IVTV APPLICATION BOOTSTRAPPER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Components
  if (window.ivtvPlayer) {
    window.ivtvPlayer.init();
  }

  if (window.UIControllerInstance) {
    window.UIControllerInstance.init();
  }

  // Navbar Dynamic Blur on Scroll
  const header = document.querySelector('.app-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Global Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    // Focus search on '/' or 'Ctrl+K'
    if ((e.key === '/' || (e.ctrlKey && e.key === 'k')) && document.activeElement.tagName !== 'INPUT') {
      e.preventDefault();
      const searchInput = document.getElementById('nav-search-input');
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
      }
    }

    // Escape clears search or blurs
    if (e.key === 'Escape') {
      const searchInput = document.getElementById('nav-search-input');
      if (document.activeElement === searchInput) {
        searchInput.value = '';
        searchInput.blur();
        window.UIControllerInstance?.handleSearch('');
      }
    }
  });

  // Smooth scroll links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (!href || href === '#' || href === '#!') return;
      e.preventDefault();
      try {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      } catch (err) {}
    });
  });

  // Welcome Toast Notification
  setTimeout(() => {
    window.showToast('IVTV Live — 30 Sky Channels Streaming in HD', 'success');
  }, 900);
});

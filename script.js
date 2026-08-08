document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Mobile Navigation Toggle
     ========================================================================== */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    // Toggle mobile navigation menu display
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });

    // Close menu automatically when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
  }


  /* ==========================================================================
     2. Category Filtering for Work Cards
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workCards = document.querySelectorAll('.work-card');

  if (filterBtns.length > 0 && workCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active highlight on filter buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter cards based on selected category
        const filterValue = btn.getAttribute('data-filter');

        workCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }


  /* ==========================================================================
     3. Interactive Embed Modal
     ========================================================================== */
  const embedModal = document.getElementById('embedModal');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const embedIframe = document.getElementById('embedIframe');
  const openEmbedBtns = document.querySelectorAll('.open-embed-btn');

  if (embedModal && embedIframe) {
    // Function to open modal and load dynamic iframe URL
    const openModal = (url, title) => {
      if (modalTitle) modalTitle.textContent = title || 'Interactive View';
      embedIframe.src = url;
      embedModal.classList.add('active');
      embedModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // Lock background scrolling
    };

    // Function to close modal and stop audio/video background playback
    const closeModal = () => {
      embedModal.classList.remove('active');
      embedModal.setAttribute('aria-hidden', 'true');
      embedIframe.src = ''; // Clear iframe src to stop embedded media
      document.body.style.overflow = ''; // Restore background scrolling
    };

    // Attach click triggers to all card "Play/Listen" buttons
    openEmbedBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const url = btn.getAttribute('data-embed-url');
        const title = btn.getAttribute('data-embed-title');
        if (url) openModal(url, title);
      });
    });

    // Event listeners to close modal
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    // Close modal on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && embedModal.classList.contains('active')) {
        closeModal();
      }
    });
  }


  /* ==========================================================================
     4. Newsletter Subscription Form
     ========================================================================== */
  const subscribeForm = document.getElementById('subscribeForm');

  if (subscribeForm) {
    subscribeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = subscribeForm.querySelector('input[type="email"]');
      
      if (emailInput && emailInput.value.trim() !== '') {
        const userEmail = emailInput.value.trim();
        
        // Success feedback
        alert(`Thanks for subscribing! We sent a confirmation to ${userEmail}. Check your inbox every other Monday.`);
        
        // Reset input field
        emailInput.value = '';
      }
    });
  }

});
import './style.css';

// 1. Mobile Navigation Toggle
const initMobileNav = () => {
  const toggleBtn = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('header-nav');
  
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', !expanded);
      navMenu.classList.toggle('header__nav--active');
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggleBtn.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('header__nav--active');
      });
    });
  }
};

// 2. CoreWeb Panel Preview Tabs
const initPanelTabs = () => {
  const tabButtons = document.querySelectorAll('[data-panel-tab]');
  
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabName = btn.getAttribute('data-panel-tab');
      
      // Remove active states from buttons
      tabButtons.forEach(b => b.classList.remove('panel-nav__btn--active'));
      // Add active state to clicked button
      btn.classList.add('panel-nav__btn--active');
      
      // Hide all mock tab contents
      const contentPanes = document.querySelectorAll('.mock-tab-content');
      contentPanes.forEach(pane => pane.classList.remove('mock-tab-content--active'));
      
      // Show targeted mock tab content
      const targetPane = document.getElementById(`mock-tab-${tabName}`);
      if (targetPane) {
        targetPane.classList.add('mock-tab-content--active');
      }
    });
  });
};

// 3. Sectoral Solutions Tabs
const initSectoralTabs = () => {
  const tabButtons = document.querySelectorAll('[data-sol-tab]');
  
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabName = btn.getAttribute('data-sol-tab');
      
      // Remove active states from buttons
      tabButtons.forEach(b => b.classList.remove('solutions-tabs__btn--active'));
      // Add active state to clicked button
      btn.classList.add('solutions-tabs__btn--active');
      
      // Hide all solution tab panes
      const contentPanes = document.querySelectorAll('.sol-tab-pane');
      contentPanes.forEach(pane => pane.classList.remove('sol-tab-pane--active'));
      
      // Show targeted solution tab pane
      const targetPane = document.getElementById(`sol-tab-${tabName}`);
      if (targetPane) {
        targetPane.classList.add('sol-tab-pane--active');
      }
    });
  });
};

// 4. Contact Form Submission with reCAPTCHA Enterprise
const initContactForm = () => {
  const form = document.getElementById('main-contact-form');
  const statusMsg = document.getElementById('form-status-msg');
  const siteKey = '6LdUHg0tAAAAADUPLdrFQSEnyjWs6DbHXtjnROuK';

  // Dynamically load Google reCAPTCHA Enterprise script
  const loadRecaptcha = () => {
    if (document.querySelector('script[src*="recaptcha/enterprise.js"]')) return;
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/enterprise.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  };

  if (form) {
    // Load reCAPTCHA when user focuses on any input
    form.addEventListener('focusin', loadRecaptcha, { once: true });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (statusMsg) {
        statusMsg.className = 'form-message';
        statusMsg.textContent = 'Gönderiliyor...';
      }

      const formData = {
        name: form.querySelector('[name="name"]').value.trim(),
        email: form.querySelector('[name="email"]').value.trim(),
        phone: form.querySelector('[name="phone"]').value.trim(),
        message: form.querySelector('[name="message"]').value.trim(),
        tenantSlug: 'coreweb'
      };

      try {
        let recaptchaToken = '';
        
        // Execute reCAPTCHA if script is loaded
        if (window.grecaptcha && window.grecaptcha.enterprise) {
          recaptchaToken = await window.grecaptcha.enterprise.execute(siteKey, { action: 'submitLead' });
        }

        const response = await fetch('https://us-central1-coreweb-panel.cloudfunctions.net/submitLead', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...formData,
            recaptchaToken
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (statusMsg) {
            statusMsg.className = 'form-message form-message--success';
            statusMsg.textContent = 'Talebiniz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.';
          }
          form.reset();
        } else {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || 'Gönderim sırasında bir hata oluştu.');
        }
      } catch (err) {
        if (statusMsg) {
          statusMsg.className = 'form-message form-message--error';
          statusMsg.textContent = err.message || 'Gönderim başarısız oldu. Lütfen tekrar deneyin.';
        }
      }
    });
  }
};

// 5. Lightweight Scroll Reveal Observer
const initScrollReveal = () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Apply reveal class dynamically to sections and cards
  const sectionsToReveal = [
    '.problem-card',
    '.solution__content',
    '.solution__visual',
    '.service-card',
    '.panel-section__info',
    '.panel-section__preview',
    '.solutions__tabs-wrapper',
    '.process-card',
    '.package-card',
    '.project-card',
    '.trust-item',
    '.contact__info',
    '.contact__form-box'
  ];

  sectionsToReveal.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add('js-reveal');
      observer.observe(el);
    });
  });
};

// Initialize all features on DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initPanelTabs();
  initSectoralTabs();
  initContactForm();
  initScrollReveal();
});

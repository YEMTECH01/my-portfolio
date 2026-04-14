<script>
  // Tailwind script should already be in <head>
  
  // Mobile Menu Toggle
  function initMobileMenu() {
    const nav = document.querySelector('nav');
    const menuButton = document.createElement('button');
    menuButton.className = 'md:hidden text-2xl text-zinc-100 focus:outline-none';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    nav.querySelector('div').appendChild(menuButton);

    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'fixed inset-0 bg-zinc-950 z-40 hidden flex-col pt-20 px-6';
    mobileMenu.style.transition = 'transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)';
    mobileMenu.innerHTML = `
      <div class="flex flex-col gap-8 text-xl font-medium">
        <a href="#services" class="mobile-link">Services</a>
        <a href="#work" class="mobile-link">Work</a>
        <a href="#about" class="mobile-link">About</a>
        <a href="#contact" class="mobile-link">Contact</a>
      </div>
    `;
    document.body.appendChild(mobileMenu);

    let isOpen = false;

    menuButton.addEventListener('click', () => {
      isOpen = !isOpen;
      menuButton.innerHTML = isOpen 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
      
      if (isOpen) {
        mobileMenu.classList.remove('hidden');
        setTimeout(() => mobileMenu.style.transform = 'translateX(0)', 10);
      } else {
        mobileMenu.style.transform = 'translateX(100%)';
        setTimeout(() => mobileMenu.classList.add('hidden'), 400);
      }
    });

    // Close menu when clicking links
    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        isOpen = false;
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenu.style.transform = 'translateX(100%)';
        setTimeout(() => mobileMenu.classList.add('hidden'), 400);
      });
    });
  }

  // Active Nav Link on Scroll
  function initActiveNav() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        Const SectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('text-emerald-400');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('text-emerald-400');
        }
      });
    });
  }

  // Smooth Scroll with Easing
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          e.preventDefault();
          const offset = 80; // account for fixed nav
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    }) ;
  }

  // Scroll Animations with Intersection Observer
  function initScrollAnimations() {
    const {observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    // Animate service cards, project cards, and sections
    document.querySelectorAll('.service-card, .project-card, section > div').forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      el.style.transition = `all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) ${index * 50}ms`;
      observer.observe(el);
    });
  }

  // Back to Top Button
  function initBackToTop() {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.className = 'fixed bottom-8 right-8 bg-zinc-800 hover:bg-emerald-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 opacity-0 pointer-events-none z-50';
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) {
        btn.classList.remove('opacity-0', 'pointer-events-none');
        btn.classList.add('opacity-100');
      } else {
        btn.classList.add('opacity-0', 'pointer-events-none');
      }
    });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Simple Contact Form Feedback (if you add a real form later)
  function initContactFeedback() {
    // Example: if you later add <form id="contact-form">, this will handle it
    const form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.textContent;
        
        btn.textContent = 'Sending...';
        btn.disabled = true;

        // Simulate sending (replace with real fetch to Formspree, EmailJS, etc.)
        setTimeout(() => {
          btn.innerHTML = '✅ Message Sent!';
          btn.classList.add('bg-emerald-500');
          
          setTimeout(() => {
            form.reset();
            btn.textContent = originalText;
            btn.classList.remove('bg-emerald-500');
            btn.disabled = false;
          }, 2500);
        }, 1200);
      });
    }
  }

  // Initialize everything when page loads
  document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initActiveNav();
    initSmoothScroll();
    initScrollAnimations();
    initBackToTop();
    initContactFeedback();

    // Optional: Add a subtle scroll progress indicator if you want later
    console.log('%cPortfolio JS initialized successfully ✨', 'color: #10b981; font-family: monospace;');
  });

</script>
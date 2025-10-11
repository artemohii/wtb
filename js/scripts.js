document.addEventListener('DOMContentLoaded', function(){
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Burger menu
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  const html = document.documentElement;
  
  // Ensure menu is closed on page load
  if (nav && burger) {
    nav.classList.remove('open');
    burger.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('_overflow');
    html.classList.remove('_overflow');
  }
  
  if (burger && nav){
    burger.addEventListener('click', function(e){
      e.stopPropagation();
      nav.classList.toggle('open');
      burger.classList.toggle('active');
      const isOpen = nav.classList.contains('open');
      burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.classList.toggle('_overflow');
      html.classList.toggle('_overflow');
      
      // Toggle cross icon
      const burgerSpans = burger.querySelectorAll('span');
      const crossIcon = burger.querySelector('.cross-icon');
      
      console.log('Menu toggled. isOpen:', isOpen, 'Spans found:', burgerSpans.length, 'Cross icon:', crossIcon);
      
      if (isOpen) {
        // Hide burger lines, show cross
        burgerSpans.forEach(span => {
          span.style.display = 'none';
        });
        if (crossIcon) {
          crossIcon.style.display = 'block';
          // Add click listener to cross icon
          crossIcon.onclick = function(e) {
            e.stopPropagation();
            nav.classList.remove('open');
            burger.classList.remove('active');
            burger.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('_overflow');
            html.classList.remove('_overflow');
            
            // Hide cross, show burger lines
            crossIcon.style.display = 'none';
            crossIcon.style.opacity = '0';
            crossIcon.style.animation = 'none';
            crossIcon.offsetHeight; // Force reflow
            crossIcon.style.animation = null;
            burgerSpans.forEach(span => {
              span.style.display = '';
            });
          };
        }
        console.log('Cross shown');
      } else {
        // Show burger lines, hide cross
        burgerSpans.forEach(span => {
          span.style.display = '';
        });
        if (crossIcon) {
          crossIcon.style.display = 'none';
          crossIcon.style.opacity = '0';
          crossIcon.onclick = null; // Remove click listener
          // Reset animation
          crossIcon.style.animation = 'none';
          crossIcon.offsetHeight; // Force reflow
          crossIcon.style.animation = null;
        }
        console.log('Burger lines shown');
      }
    });
    
    // Close on link click (mobile)
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(e){
        nav.classList.remove('open');
        burger.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('_overflow');
        html.classList.remove('_overflow');
        
        // Hide cross completely
        const crossIcon = burger.querySelector('.cross-icon');
        if (crossIcon) {
          crossIcon.style.display = 'none';
        }
        
        // Reset burger icon
        const burgerSpans = burger.querySelectorAll('span');
        burgerSpans.forEach(span => {
          span.style.display = '';
        });
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e){
      if (nav.classList.contains('open') && !nav.contains(e.target) && !burger.contains(e.target)) {
        nav.classList.remove('open');
        burger.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('_overflow');
        html.classList.remove('_overflow');
        
        // Reset burger icon
        const burgerSpans = burger.querySelectorAll('span');
        burgerSpans[0].style.cssText = '';
        burgerSpans[1].style.cssText = '';
        burgerSpans[2].style.cssText = '';
      }
    });
  }

  // Smooth scroll to anchors with header offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      console.log('Anchor clicked:', targetId);
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        console.log('Menu is open:', nav.classList.contains('open'));
        
        // Close menu and hide cross if open
        if (nav && nav.classList.contains('open')) {
          console.log('Closing menu and hiding cross');
          nav.classList.remove('open');
          burger.classList.remove('active');
          burger.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('_overflow');
          html.classList.remove('_overflow');
          
          // Hide cross completely
          const crossIcon = burger.querySelector('.cross-icon');
          if (crossIcon) {
            crossIcon.style.display = 'none';
            console.log('Cross hidden');
          }
          
          // Show burger lines
          const burgerSpans = burger.querySelectorAll('span');
          burgerSpans.forEach(span => {
            span.style.display = '';
          });
        }
        
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // IntersectionObserver for fade-in / slide-up
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

  document.querySelectorAll('.fade-in, .slide-up, section').forEach(el => observer.observe(el));

  // Parallax effect for Akademie section
  const akademieSection = document.querySelector('.section-akademie');
  if (akademieSection) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const sectionTop = akademieSection.offsetTop;
      const sectionHeight = akademieSection.offsetHeight;
      
      if (scrolled > sectionTop - window.innerHeight && scrolled < sectionTop + sectionHeight) {
        const parallaxSpeed = 0.5; // 50% скорости прокрутки
        const yPos = (scrolled - sectionTop) * parallaxSpeed;
        akademieSection.style.setProperty('--parallax-y', yPos + 'px');
      }
    });
  }

  // Animated counters in hero stats
  const counters = document.querySelectorAll('.stat-number');
  let animated = false;
  
  const animateCounters = () => {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'));
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;
      
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      
      updateCounter();
    });
  };

  // Trigger animation when hero stats are visible
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    statsObserver.observe(heroStats);
  }

  // Contact form submission with AJAX
  const form = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  
  if (form && formSuccess){
    form.addEventListener('submit', async function(e){
      e.preventDefault();
      
      const name = form.querySelector('input[name="name"]');
      const email = form.querySelector('input[name="email"]');
      
      if (!name.value.trim() || !email.value.trim()){
        alert('Bitte füllen Sie Name und E‑Mail aus.');
        return;
      }
      
      const submitBtn = form.querySelector('.btn-submit');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Wird gesendet...';
      submitBtn.disabled = true;
      
      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          form.style.display = 'none';
          formSuccess.style.display = 'block';
          form.reset();
        } else {
          throw new Error('Formspree error');
        }
      } catch (error) {
        alert('Es gab ein Problem beim Senden. Bitte versuchen Sie es später erneut.');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }
});


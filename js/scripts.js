document.addEventListener('DOMContentLoaded', function(){
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Burger menu
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  const html = document.documentElement;
  if (burger && nav){
    burger.addEventListener('click', function(){
      const open = nav.classList.toggle('open');
      burger.classList.toggle('active', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('_overflow', open);
      html.classList.toggle('_overflow', open);
    });
    // Close on link click (mobile)
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        nav.classList.remove('open');
        burger.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('_overflow');
        html.classList.remove('_overflow');
      });
    });
  }

  // Smooth scroll to anchors with header offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
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


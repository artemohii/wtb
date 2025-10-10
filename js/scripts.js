document.addEventListener('DOMContentLoaded', function(){
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Burger menu
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  if (burger && nav){
    burger.addEventListener('click', function(){
      const open = nav.classList.toggle('open');
      burger.classList.toggle('active', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('no-scroll', open);
    });
    // Close on link click (mobile)
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        nav.classList.remove('open');
        burger.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
      });
    });
  }

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

  // Simple contact form validation
  const form = document.getElementById('contact-form');
  if (form){
    form.addEventListener('submit', function(e){
      const name = form.querySelector('input[name="name"]');
      const email = form.querySelector('input[name="email"]');
      if (!name.value.trim() || !email.value.trim()){
        e.preventDefault();
        alert('Bitte füllen Sie Name und E‑Mail aus.');
      }
    });
  }
});


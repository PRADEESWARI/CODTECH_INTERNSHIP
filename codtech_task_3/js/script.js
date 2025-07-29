// Navigation active state (optional)
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add('active');
    }
  });

  // Form submission handler
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thank you! Your message has been sent.');
      form.reset();
    });
  }
});

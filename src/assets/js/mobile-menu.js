// (() => {
//   const body = document.querySelector('body');
//   const openMenuBtn = document.querySelector('[data-open-menu-btn]');
//   const closeMenuBtn = document.querySelector('[data-close-menu-btn]');
//   const menu = document.querySelector('[data-menu]');
//   const menuLink = document.querySelectorAll('[data-menu-link]');

//   openMenuBtn.addEventListener('click', () => {
//     toggleMenu();
//     // adds a listener to close btn
//     closeMenuBtn.addEventListener('click', toggleMenu);
//   });

//   menuLink.forEach(function (link) {
//     link.addEventListener('click', () => {
//       toggleMenu();
//     });
//   });

//   function toggleMenu() {
//     if (window.innerWidth < 1280) {
//       const expanded = openMenuBtn.getAttribute('aria-expanded') === 'true' || false;

//       openMenuBtn.classList.toggle('is-active');
//       openMenuBtn.setAttribute('aria-expanded', !expanded);

//       body.classList.toggle('scroll-hidden');
//       menu.classList.toggle('is-open');
//     }

//     // removes a listener to close btn
//     closeMenuBtn.removeEventListener('click', toggleMenu);
//   }
// })();

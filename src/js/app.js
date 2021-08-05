const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.main-navigation');
menuToggle.addEventListener('click', (e) => {
  e.preventDefault();
  menuToggle.classList.toggle('active');
  menu.classList.toggle('hidden');
});

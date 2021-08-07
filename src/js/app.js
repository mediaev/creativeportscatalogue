const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.main-navigation');
menuToggle.addEventListener('click', (e) => {
  e.preventDefault();
  menuToggle.classList.toggle('active');
  menu.classList.toggle('hidden');
});

document.querySelectorAll('.footnote-item p').forEach((footnote) => {
  const parent = footnote.parentNode;
  const id = parent.id;
  const copy = footnote.cloneNode(true);
  const wrapper = document.createElement('div');
  wrapper.classList.add('footnote-reference', 'hidden');
  wrapper.appendChild(copy);
  const backLink = wrapper.querySelector('.footnote-backref')
  backLink.parentNode.removeChild(backLink);

  const link = document.querySelector('a[href="#' + id + '"]');
  const referencing = link.closest('p');
  referencing.insertAdjacentElement('afterend', wrapper);

  link.addEventListener('mouseover', () => {
    wrapper.classList.remove('hidden');
  });

  link.addEventListener('mouseout', () => {
    wrapper.classList.add('hidden');
  });
});

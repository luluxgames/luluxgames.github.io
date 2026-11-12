document.documentElement.classList.add('js');
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-navigation');
function closeMenu() { menu?.setAttribute('aria-expanded', 'false'); navigation?.classList.remove('is-open'); }
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation?.addEventListener('click', (event) => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { const open = menu?.getAttribute('aria-expanded') === 'true'; closeMenu(); if (open) menu.focus(); } });
window.matchMedia('(min-width: 701px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
const filterButtons = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('[data-categories]');
filterButtons.forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  filterButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  let visible = 0;
  projectCards.forEach(card => {
    const match = category === 'all' || card.dataset.categories.split(' ').includes(category);
    card.hidden = !match;
    if (match) visible++;
  });
  const result = document.querySelector('#result-count');
  if (result) result.textContent = `${visible} ${visible === 1 ? 'project' : 'projects'}`;
}));

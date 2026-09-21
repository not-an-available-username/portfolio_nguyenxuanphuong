const toggle = document.querySelector('#toggle-theme');
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') document.body.classList.add('dark-mode');

function setToggleLabel() {
  if (!toggle) return;
  const dark = document.body.classList.contains('dark-mode');
  toggle.setAttribute('aria-label', dark ? 'Use light theme' : 'Use dark theme');
  toggle.textContent = dark ? '☼' : '◐';
}
setToggleLabel();
toggle?.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('portfolio-theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
  setToggleLabel();
});

const modal = document.querySelector('#certificate-modal');
const modalImage = document.querySelector('#certificate-image');
document.querySelectorAll('.achievement-card').forEach((card) => {
  card.addEventListener('click', () => {
    if (!modal || !modalImage || !card.dataset.certificate) return;
    modalImage.src = card.dataset.certificate;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });
});
function closeModal() { if (modal) { modal.style.display = 'none'; document.body.style.overflow = ''; } }
modal?.querySelector('.close')?.addEventListener('click', closeModal);
modal?.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });

document.querySelectorAll('.copy-btn').forEach((button) => {
  button.addEventListener('click', async () => {
    const value = document.getElementById(button.dataset.copy)?.textContent;
    if (!value) return;
    await navigator.clipboard.writeText(value);
    const original = button.innerHTML;
    button.textContent = 'Copied';
    setTimeout(() => { button.innerHTML = original; }, 1200);
  });
});

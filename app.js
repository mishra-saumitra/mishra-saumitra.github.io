'use strict';
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open navigation'); navigation.classList.remove('open'); }
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); navigation.classList.toggle('open', open); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menuButton.focus(); } });


const layers = {
  foundation: { label: 'FOUNDATION FIRST', title: 'A modernization path<br>that respects the existing estate.', text: 'BW readiness, in-place conversion, LSA++ design and performance tuning. Keep reporting dependable while the architecture evolves.', tags: ['ADSOs & CompositeProviders', 'Delta handling', 'Reconciliation & cutover'] },
  connect: { label: 'CONNECTED DATA', title: 'Bring the data together.<br>Keep its business meaning.', text: 'Datasphere spaces, connections, replication flows and semantic models. Design the BDC target architecture around reusable data products and a realistic modernization roadmap.', tags: ['SQL & graphical views', 'Data Access Controls', 'Cloud Connector & DP Agent'] },
  decisions: { label: 'DECISION READY', title: 'Turn trusted models<br>into useful conversations.', text: 'SAC stories, live and import connections, and planning capabilities. Build reporting and planning around business questions, with validation back to the source.', tags: ['SAC Planning', 'Analytic models', 'Data actions & allocations'] },
  intelligence: { label: 'A THOUGHTFUL NEXT STEP', title: 'Give business AI<br>a dependable data foundation.', text: 'Frame finance reporting and agent use cases around governed, AI-ready data. My focus combines architecture-level work with SAP Business AI and Generative AI certifications.', tags: ['AI-ready data products', 'Generative AI Hub & AI Core', 'Clean Core principles'] }
};
const tabs = [...document.querySelectorAll('[data-layer]')];
const panel = document.querySelector('#architecture-panel');
function selectLayer(tab) { const layer = layers[tab.dataset.layer]; tabs.forEach(item => { const selected = item === tab; item.setAttribute('aria-selected', String(selected)); item.tabIndex = selected ? 0 : -1; }); panel.setAttribute('aria-labelledby', tab.id); panel.innerHTML = `<div><span class="panel-label">${layer.label}</span><h3>${layer.title}</h3></div><div><p>${layer.text}</p><ul class="tag-list">${layer.tags.map(tag => `<li>${tag}</li>`).join('')}</ul></div>`; }
tabs.forEach((tab, index) => { tab.addEventListener('click', () => selectLayer(tab)); tab.addEventListener('keydown', event => { let next; if (event.key === 'ArrowRight') next = (index + 1) % tabs.length; if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length; if (event.key === 'Home') next = 0; if (event.key === 'End') next = tabs.length - 1; if (next !== undefined) { event.preventDefault(); tabs[next].focus(); selectLayer(tabs[next]); } }); });

document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button))); document.querySelectorAll('.work-card').forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; card.classList.remove('pending'); }); }));

const progress = document.querySelector('.reading-progress');
let ticking = false;
function updateProgress() { const max = document.documentElement.scrollHeight - innerHeight; progress.style.width = `${max > 0 ? Math.min(100, Math.max(0, scrollY / max * 100)) : 0}%`; ticking = false; }
addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(updateProgress); ticking = true; } }, { passive: true });
addEventListener('resize', updateProgress); updateProgress();
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { navigation.querySelectorAll('a').forEach(link => { if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); }); } }), { rootMargin: '-20% 0px -60% 0px' });
  document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
  if (!reduceMotion) { document.body.classList.add('motion-ready'); const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.remove('pending'); entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } }), { threshold: .07 }); document.querySelectorAll('.reveal').forEach(element => { element.classList.add('pending'); revealObserver.observe(element); }); }
}
// Reference pacing: type 80 ms, hold 1100 ms, erase 30 ms.
const roleTarget = document.querySelector('#rotating-role');
const roles = ['SAP Data & Analytics', 'SAP Datasphere & BDC', 'SAP Data Architect'];
if (!reduceMotion && roleTarget) {
  let roleIndex = 0;
  let characterIndex = 0;
  let deleting = false;
  roleTarget.textContent = '';
  function typeRole() {
    if (document.hidden) { setTimeout(typeRole, 250); return; }
    const role = roles[roleIndex];
    characterIndex += deleting ? -1 : 1;
    roleTarget.textContent = role.slice(0, characterIndex);
    let delay = deleting ? 30 : 80;
    if (!deleting && characterIndex === role.length) {
      deleting = true;
      delay = 1100;
    } else if (deleting && characterIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 350;
    }
    setTimeout(typeRole, delay);
  }
  setTimeout(typeRole, 350);
}

// ── Utilities ────────────────────────────────────────────────
function save(key, value) {
  localStorage.setItem('wex-' + key, value);
}

function load(key) {
  return localStorage.getItem('wex-' + key) || '';
}

// ── Card entry stagger ───────────────────────────────────────
document.querySelectorAll('.card').forEach((card, i) => {
  card.style.animationDelay = `${i * 0.045}s`;
});

// ── Text inputs & textareas ──────────────────────────────────
document.querySelectorAll('textarea, input[type="text"]').forEach(el => {
  const key = el.dataset.id;
  if (!key) return;
  el.value = load(key);
  el.addEventListener('input', () => save(key, el.value));
});

// ── Progress bar ─────────────────────────────────────────────
const SESSION_IDS = [
  'finance','it','hr','travel','sales',
  'project','design','hse','compliance',
  'commercial','sitevisit'
];
const TOTAL = SESSION_IDS.length;

const DC_STAGE_LABELS = [
  'Site preparation pending',
  'Survey complete · site secured',
  'Foundation laid',
  'Steel frame erected',
  'Walls complete',
  'Roof structure on',
  'Fit-out in progress',
  'Mechanical &amp; cooling installed',
  'Grid power connected',
  'Generator on standby',
  'Systems live · servers running',
  'Datacenter online &#x1f7e2;',
];

function updateProgress() {
  const rated = SESSION_IDS.filter(id => parseInt(load('stars-' + id)) > 0).length;
  const pct   = (rated / TOTAL) * 100;
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressCount').textContent = rated;

  const dc = document.getElementById('datacenter');
  if (dc && window.renderDatacenter) window.renderDatacenter(dc, rated);

  const lbl = document.getElementById('dcStageLabel');
  if (lbl) lbl.innerHTML = DC_STAGE_LABELS[rated] || '';
}

// ── Star ratings ─────────────────────────────────────────────
document.querySelectorAll('.stars').forEach(starGroup => {
  const id    = starGroup.dataset.id;
  const stars = starGroup.querySelectorAll('span');

  setStars(starGroup, parseInt(load('stars-' + id)) || 0);

  stars.forEach((star, index) => {
    star.addEventListener('click', () => {
      const rating = index + 1;
      save('stars-' + id, rating);
      setStars(starGroup, rating);
      popStars(stars, rating);
      updateProgress();
    });
  });
});

function setStars(group, count) {
  group.querySelectorAll('span').forEach((star, i) => {
    star.textContent = i < count ? '★' : '☆';
    star.classList.toggle('filled', i < count);
  });
}

function popStars(stars, count) {
  stars.forEach((star, i) => {
    if (i >= count) return;
    const delay = i * 40;
    setTimeout(() => {
      star.classList.remove('pop');
      void star.offsetWidth;
      star.classList.add('pop');
      star.addEventListener('animationend', () => star.classList.remove('pop'), { once: true });
    }, delay);
  });
}

// ── Init ─────────────────────────────────────────────────────
updateProgress();

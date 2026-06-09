// Save and restore all inputs using localStorage
// Key: the data-id attribute on each input/textarea

function save(key, value) {
  localStorage.setItem('wex-' + key, value);
}

function load(key) {
  return localStorage.getItem('wex-' + key) || '';
}

// ── Text inputs & textareas ──────────────────────────────
document.querySelectorAll('textarea, input[type="text"]').forEach(el => {
  const key = el.dataset.id;
  if (!key) return;

  el.value = load(key);

  el.addEventListener('input', () => save(key, el.value));
});

// ── Star ratings ─────────────────────────────────────────
document.querySelectorAll('.stars').forEach(starGroup => {
  const id = starGroup.dataset.id;
  const stars = starGroup.querySelectorAll('span');

  // Restore saved rating
  const saved = parseInt(load('stars-' + id)) || 0;
  setStars(starGroup, saved);

  stars.forEach((star, index) => {
    star.addEventListener('click', () => {
      const rating = index + 1;
      save('stars-' + id, rating);
      setStars(starGroup, rating);
    });
  });
});

function setStars(group, count) {
  group.querySelectorAll('span').forEach((star, i) => {
    star.textContent = i < count ? '★' : '☆';
    star.classList.toggle('filled', i < count);
  });
}

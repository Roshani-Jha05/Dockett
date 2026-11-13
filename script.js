// 1. Mobile menu
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', false);
}));

// 2. Tracking demo
const shipments = {
  DKT1042: ['Order packed in Pune', 'Picked up by courier', 'Out for delivery in Mumbai'],
  DKT2077: ['Order packed in Delhi', 'Picked up by courier', 'In transit to Jaipur', 'Delivered'],
  DKT3150: ['Order packed in Chennai', 'Picked up by courier']
};
const trackForm = document.getElementById('trackForm');
const trackError = document.getElementById('trackError');
const timeline = document.getElementById('timeline');

trackForm.addEventListener('submit', e => {
  e.preventDefault();
  const id = document.getElementById('trackId').value.trim().toUpperCase();
  timeline.innerHTML = '';
  if (!id) { trackError.textContent = 'Enter a tracking number.'; return; }
  if (!shipments[id]) { trackError.textContent = 'No parcel found. Try one of the demo numbers.'; return; }
  trackError.textContent = '';
  shipments[id].forEach((step, i, arr) => {
    const li = document.createElement('li');
    li.textContent = step;
    if (i === arr.length - 1) li.className = 'now';
    timeline.appendChild(li);
  });
});

// 3. Pricing toggle
document.querySelectorAll('.toggle button').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.toggle button').forEach(b => b.classList.toggle('active', b === btn));
  const period = btn.dataset.period;
  document.querySelectorAll('[data-monthly]').forEach(el => {
    el.textContent = Number(el.dataset[period]).toLocaleString('en-IN');
    el.nextElementSibling.textContent = period === 'monthly' ? '/month' : '/year';
  });
}));

const plans = document.querySelectorAll('.plan');
plans.forEach(card => card.addEventListener('click', () => {
  plans.forEach(p => {
    const chosen = p === card;
    const btn = p.querySelector('.choose');
    p.classList.toggle('selected', chosen);
    btn.classList.toggle('btn-primary', chosen);
    btn.classList.toggle('btn-ghost', !chosen);
    btn.setAttribute('aria-pressed', chosen);
    btn.textContent = chosen ? 'Selected ✓' : 'Choose ' + btn.dataset.plan;
  });
}));

// 4. Demo form validation
const demoForm = document.getElementById('demoForm');
const success = document.getElementById('success');

function check(input, message) {
  const field = input.closest('.field');
  field.classList.toggle('invalid', !!message);
  field.querySelector('.error').textContent = message;
  return !message;
}

demoForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = demoForm.name, email = demoForm.email, orders = demoForm.orders;
  const results = [
    check(name, name.value.trim().length < 2 ? 'Enter your name (at least 2 characters).' : ''),
    check(email, /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim()) ? '' : 'Enter a valid email, like name@company.com.'),
    check(orders, orders.value ? '' : 'Choose how many orders you ship.')
  ];
  if (results.every(Boolean)) {
    success.hidden = false;
    demoForm.reset();
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    success.hidden = true;
  }
});

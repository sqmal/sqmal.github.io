(() => {
  const yearEl = document.getElementById('year');
  const applyBtns = document.querySelectorAll('.apply-btn');
  const applyRoleSel = document.getElementById('applyRole');
  const applyForm = document.getElementById('applyForm');
  const applyStatus = document.getElementById('applyStatus');

  const rolesFilterBtns = document.querySelectorAll('[data-filter]');
  const fleetGrid = document.getElementById('fleetGrid');
  const fleetTpl = document.getElementById('fleetTpl');
  const fleetSearch = document.getElementById('fleetSearch');
  const fleetSort = document.getElementById('fleetSort');
  const fleetEmpty = document.getElementById('fleetEmpty');

  const BONUS_PAID_TOTAL_CZK = 1077864;

  function formatCZK(n){
    try { return Number(n).toLocaleString('cs-CZ',{style:'currency',currency:'CZK',maximumFractionDigits:0}); }
    catch { return `${n} Kč`; }
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    const bonusEl = document.getElementById('bonusPaid');
    if (bonusEl) bonusEl.textContent = formatCZK(BONUS_PAID_TOTAL_CZK);
    renderFleet();
  });

  applyBtns.forEach(b => b.addEventListener('click', () => {
    const role = b.getAttribute('data-role') || '';
    if (applyRoleSel) applyRoleSel.value = role;
    const target = document.getElementById('apply');
    if (target) window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
  }));

  rolesFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.getAttribute('data-filter');
      document.querySelectorAll('.role-card').forEach(card => {
        card.classList.toggle('d-none', group !== 'all' && card.getAttribute('data-group') !== group);
      });
      rolesFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  if (applyForm) {
    applyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(applyForm);
      const d = Object.fromEntries(fd.entries());
      if (!String(d.email).includes('@') || !d.role) {
        applyStatus.innerHTML = '<div class="alert alert-danger">Zkontrolujte email a výběr pozice.</div>';
        return;
      }
      const payload = {
        username: 'TTL – Tactical Transport Logistics',
        embeds: [{
          title: 'Nová přihláška',
          color: 0x2b6cff,
          fields: [
            { name: 'Jméno', value: d.name || '-', inline: true },
            { name: 'Email', value: d.email || '-', inline: true },
            { name: 'Telefon', value: d.phone || '-', inline: true },
            { name: 'Pozice', value: d.role || '-', inline: false }
          ],
          timestamp: new Date().toISOString()
        }]
      };
      fetch('https://sqmal.eu/artic/premiumcars.php', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
      })
      .then(() => {
        applyStatus.innerHTML = '<div class="alert alert-success">Přihláška odeslána.</div>';
        applyForm.reset();
      })
      .catch(() => {
        applyStatus.innerHTML = '<div class="alert alert-danger">Chyba při odesílání.</div>';
      });
    });
  }

  const fleetData = [
    { model: 'Suzuki Bandit', year: 2011, type: 'Motocykl', count: 3 },
    { model: 'BMW M135i', year: 2014, type: 'Hatchback', count: 3 },
    { model: 'Chevrolet C-K Cheyenne', year: 1994, type: 'Pickup', count: 3 },
    { model: 'Adjutor S/Y', year: 2002, type: 'Lodní jednotka', count: 1 },
    { model: 'Freightliner THX8500', year: 1996, type: 'Tahač', count: 1 },
    { model: 'Scania R580 V8', year: 2011, type: 'Tahač', count: 2 },
    { model: 'Mercedes-Benz Sprinter', year: 2019, type: 'Dodávka', count: 1 }
  ];

  function ecoRecommended(year){
    return year >= 2011;
  }

  function renderFleet(){
    if (!fleetGrid || !fleetTpl) return;
    fleetGrid.innerHTML = '';
    const q = (fleetSearch?.value || '').toLowerCase().trim();
    const sorted = [...fleetData].sort((a,b) => {
      if (!fleetSort) return 0;
      if (fleetSort.value === 'yearDesc') return b.year - a.year;
      if (fleetSort.value === 'yearAsc') return a.year - b.year;
      return a.model.localeCompare(b.model,'cs');
    }).filter(item => {
      if (!q) return true;
      return item.model.toLowerCase().includes(q) || String(item.year).includes(q);
    });

    if (!sorted.length){
      fleetEmpty?.classList.remove('d-none');
      return;
    }
    fleetEmpty?.classList.add('d-none');

    const frag = document.createDocumentFragment();
    sorted.forEach(item => {
      const node = fleetTpl.content.cloneNode(true);
      node.querySelector('.model').textContent = `${item.model} ×${item.count}`;
      node.querySelector('.year').textContent = item.year;
      node.querySelector('.type').textContent = item.type;
      const badges = node.querySelector('.badges');
      badges.innerHTML = '';
      const fuel = document.createElement('span');
      fuel.className = 'badge badge-soft';
      fuel.innerHTML = '<i class="fa-solid fa-gas-pump me-1"></i>Palivo: firemní';
      badges.appendChild(fuel);
      if (ecoRecommended(item.year)){
        const eco = document.createElement('span');
        eco.className = 'badge badge-eco';
        eco.innerHTML = '<i class="fa-solid fa-leaf me-1"></i>Eco doporučeno';
        badges.appendChild(eco);
      }
      frag.appendChild(node);
    });
    fleetGrid.appendChild(frag);
  }

  fleetSearch?.addEventListener('input', renderFleet);
  fleetSort?.addEventListener('change', renderFleet);
})();

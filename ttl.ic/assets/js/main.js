(() => {
  const yearEl = document.getElementById('year');
  const applyBtns = document.querySelectorAll('.apply-btn');
  const applyRoleSel = document.getElementById('applyRole');
  const applyForm = document.getElementById('applyForm');
  const applyStatus = document.getElementById('applyStatus');

  const rolesFilterBtns = document.querySelectorAll('[data-filter]');

  const calcGroup = document.getElementById('calcGroup');
  const calcProfit = document.getElementById('calcProfit');
  const calcBtn = document.getElementById('calcBtn');
  const calcReset = document.getElementById('calcReset');
  const calcOut = document.getElementById('calcOut');
  const calcProgressBox = document.getElementById('calcProgress');
  const calcBar = document.getElementById('calcBar');
  const calcMilestoneLabel = document.getElementById('calcMilestoneLabel');
  const calcBand = document.getElementById('calcBand');

  const fleetGrid = document.getElementById('fleetGrid');
  const fleetTpl = document.getElementById('fleetTpl');
  const fleetSearch = document.getElementById('fleetSearch');
  const fleetSort = document.getElementById('fleetSort');
  const fleetEmpty = document.getElementById('fleetEmpty');

  document.addEventListener('DOMContentLoaded', () => {
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    renderFleet();
    attachCalc();
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

  function formatCzk(n){
    return new Intl.NumberFormat('cs-CZ').format(Math.max(0, Math.round(n))) + ' Kč';
  }

  const ladder = {
    A: [
      { label:'Zkušební doba', threshold:0, next:500000, salary:0, minStay:300000 },
      { label:'Zaměstnanec II', threshold:500000, next:1000000, salary:10000, minStay:300000 },
      { label:'Zaměstnanec III', threshold:1000000, next:1500000, salary:15000, minStay:300000 },
      { label:'Zaměstnanec IV', threshold:1500000, next:null, salary:20000, minStay:300000 }
    ],
    B: [
      { label:'Zkušební doba', threshold:0, next:125000, salary:0, minStay:100000 },
      { label:'Zaměstnanec II', threshold:125000, next:300000, salary:1000, minStay:100000 },
      { label:'Zaměstnanec III', threshold:300000, next:500000, salary:5000, minStay:100000 },
      { label:'Zaměstnanec IV', threshold:500000, next:null, salary:10000, minStay:100000 }
    ]
  };

  function getStage(group, profit){
    const steps = ladder[group];
    let stage = steps[0];
    for (let i = 0; i < steps.length; i++){
      if (profit >= steps[i].threshold) stage = steps[i];
    }
    return stage;
  }

  function premiumPercent(profit){
    if (profit >= 700000 && profit <= 1000000) return 30;
    if (profit >= 500000 && profit < 700000) return 25;
    if (profit >= 400000 && profit < 500000) return 20;
    if (profit >= 300000 && profit < 400000) return 15;
    if (profit >= 200000 && profit < 300000) return 10;
    if (profit >= 100000 && profit < 200000) return 5;
    return 0;
  }

  function premiumBandText(profit){
    if (profit < 100000) return 'mimo pásmo';
    if (profit < 200000) return '5 % (100–200 tis.)';
    if (profit < 300000) return '10 % (200–300 tis.)';
    if (profit < 400000) return '15 % (300–400 tis.)';
    if (profit < 500000) return '20 % (400–500 tis.)';
    if (profit < 700000) return '25 % (500–700 tis.)';
    if (profit <= 1000000) return '30 % (700 tis.–1 mil.)';
    return '30 % +';
  }

  function sanitizeNumber(v){
    const n = Number(v);
    return isFinite(n) && n >= 0 ? n : 0;
  }

  function runCalc(){
    const group = (document.getElementById('calcGroup')?.value === 'B') ? 'B' : 'A';
    const profit = sanitizeNumber(calcProfit.value);
    calcProfit.value = profit;
    const stage = getStage(group, profit);
    const prem = premiumPercent(profit);
    const meetsStay = profit >= stage.minStay ? 'splněno' : `chybí ${formatCzk(stage.minStay - profit)}`;
    calcOut.innerHTML = `
      <div class="rounded-3 p-3 border" style="background: var(--ttl-surface);">
        <div><strong>Úroveň:</strong> ${stage.label}</div>
        <div><strong>Fixní plat:</strong> ${formatCzk(stage.salary)}</div>
        <div><strong>Prémie:</strong> ${prem}%</div>
        <div><strong>Setrvání (${formatCzk(stage.minStay)}):</strong> ${meetsStay}</div>
        <div><strong>Další krok:</strong> ${stage.next ? 'cíl ' + formatCzk(stage.next) : 'maximální úroveň'}</div>
      </div>
    `;
    if (stage.next){
      const span = stage.next - stage.threshold;
      const done = Math.max(0, Math.min(span, profit - stage.threshold));
      const pct = Math.round((done / span) * 100);
      calcMilestoneLabel.textContent = `${formatCzk(done)} / ${formatCzk(span)}`;
      calcBar.style.width = `${pct}%`;
      calcProgressBox.classList.remove('d-none');
    } else {
      calcProgressBox.classList.add('d-none');
    }
    calcBand.textContent = premiumBandText(profit);
  }

  function attachCalc(){
    ['input','change'].forEach(ev => {
      calcGroup.addEventListener(ev, runCalc);
      calcProfit.addEventListener(ev, runCalc);
    });
  }

  if (calcBtn) calcBtn.addEventListener('click', runCalc);
  if (calcReset) calcReset.addEventListener('click', () => {
    calcGroup.value = 'A';
    calcProfit.value = 0;
    calcOut.innerHTML = '';
    calcProgressBox.classList.add('d-none');
    calcBand.textContent = '—';
    calcBar.style.width = '0%';
    calcMilestoneLabel.textContent = '0 / 0 Kč';
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
          color: 0x1d4ed8,
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
(() => {
  const grid = document.querySelector('#cars-grid');
  const emptyState = document.querySelector('#emptyState');
  const search = document.querySelector('#search');
  const sortSel = document.querySelector('#sort');
  const onlyAvail = document.querySelector('#onlyAvailable');
  const onlyEco = document.querySelector('#onlyEco');

  const modal = new bootstrap.Modal(document.getElementById('carModal'));
  const mImg = document.getElementById('carImage');
  const mTitle = document.getElementById('carTitle');
  const mFacts = document.getElementById('carFacts');
  const mForm = document.getElementById('order-form');
  const mStatus = document.getElementById('status');
  const fVozidlo = document.getElementById('f-vozidlo');

  const fOd = document.getElementById('f-od');
  const fDo = document.getElementById('f-do');
  const pricePerDayEl = document.getElementById('pricePerDay');
  const priceTotalEl = document.getElementById('priceTotal');
  const appliedDiscountEl = document.getElementById('appliedDiscount');

  const ecoKm = document.getElementById('ecoKm');
  const ecoL100 = document.getElementById('ecoL100');
  const ecoFuel = document.getElementById('ecoFuel');
  const ecoCalcBtn = document.getElementById('ecoCalcBtn');
  const ecoResult = document.getElementById('ecoResult');

  let cars = [];
  let view = [];
  let selected = null;

  document.addEventListener('DOMContentLoaded', () => {
    fetch('data/cars.json')
      .then(r => r.json())
      .then(d => { cars = d; view = [...cars]; render(); });
    document.getElementById('year').textContent = new Date().getFullYear();
  });

  [search, sortSel, onlyAvail, onlyEco].forEach(el => el && el.addEventListener('input', applyFilters));

  function modelYearFromName(name){
    const m = String(name).match(/^(\d{4})/);
    return m ? Number(m[1]) : null;
  }

  function isEcoRecommended(car){
    if (typeof car.eco === 'boolean') return car.eco;
    const y = modelYearFromName(car.name);
    return y && y >= 2015;
  }

  function applyFilters(){
    const q = (search.value || '').toLowerCase().trim();
    view = cars.filter(c => {
      const okAvail = !onlyAvail?.checked || !!c.available;
      const okQuery = !q || c.name.toLowerCase().includes(q);
      const okEco = !onlyEco?.checked || isEcoRecommended(c);
      return okAvail && okQuery && okEco;
    });
    sortView();
    render();
  }

  function parsePriceCZK(str){
    return Number(String(str).replace(/[^0-9]/g,'') || 0);
  }
  function parseSpeed(str){
    return Number(String(str).replace(/[^0-9]/g,'') || 0);
  }
  function formatCzk(n){
    return new Intl.NumberFormat('cs-CZ').format(Math.max(0, Math.round(n))) + ' Kč';
  }
  function daysBetween(a, b){
    const d1 = new Date(a), d2 = new Date(b);
    const ms = d2 - d1;
    return Math.max(1, Math.ceil(ms / 86400000));
  }
  function discountForDays(days){
    if (days >= 7) return 20;
    if (days >= 3) return 10;
    return 0;
  }

  function sortView(){
    const v = sortSel.value;
    if(v === 'priceAsc') view.sort((a,b)=> parsePriceCZK(a.price) - parsePriceCZK(b.price));
    if(v === 'priceDesc') view.sort((a,b)=> parsePriceCZK(b.price) - parsePriceCZK(a.price));
    if(v === 'speedDesc') view.sort((a,b)=> parseSpeed(b.speed) - parseSpeed(a.speed));
    if(v === 'nameAsc') view.sort((a,b)=> a.name.localeCompare(b.name,'cs'));
  }

  function render(){
    grid.innerHTML = '';
    if(!view.length){
      emptyState.classList.remove('d-none');
      return;
    }
    emptyState.classList.add('d-none');
    const frag = document.createDocumentFragment();
    view.forEach(car => frag.appendChild(renderCard(car)));
    grid.appendChild(frag);
  }

  function renderCard(car){
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-lg-4';
    col.innerHTML = `
      <div class="card h-100 car border-0 shadow-sm">
        <div class="ratio ratio-16x9">
          <img src="${car.image}" alt="${car.name}" class="rounded-top object-fit-cover" loading="lazy" referrerpolicy="no-referrer" />
        </div>
        <div class="card-body d-flex flex-column">
          <div class="d-flex justify-content-between align-items-start">
            <h3 class="h5 fw-semibold mb-1">${car.name}</h3>
            <span class="badge ${car.available ? 'text-bg-success' : 'text-bg-danger'}">${car.available ? 'Dostupné' : 'Nedostupné'}</span>
          </div>
          <div class="d-flex flex-wrap gap-2 mt-1">
            ${car.tuning ? '<span class="badge badge-soft"><i class="fa-solid fa-wrench me-1"></i>Tuning</span>' : ''}
            ${car.wrap ? '<span class="badge badge-soft"><i class="fa-solid fa-swatchbook me-1"></i>Polep</span>' : ''}
            <span class="badge badge-soft"><i class="fa-solid fa-gauge-high me-1"></i>${car.speed}</span>
            ${isEcoRecommended(car) ? '<span class="badge badge-eco"><i class="fa-solid fa-leaf me-1"></i>Eco doporučeno</span>' : ''}
          </div>
          <div class="mt-3 d-flex align-items-baseline gap-2">
            <span class="fs-5 fw-bold">${car.price}</span>
          </div>
          <div class="mt-auto d-grid">
            <button class="btn btn-primary" data-car-id="${car.id}"><i class="fa-solid fa-eye me-2"></i>Detail</button>
          </div>
        </div>
      </div>`;
    col.querySelector('button').addEventListener('click', () => openModal(car));
    return col;
  }

  function initDates(){
    const today = new Date();
    const plus3 = new Date(today); plus3.setDate(today.getDate()+3);
    fOd.value = today.toISOString().slice(0,10);
    fDo.value = plus3.toISOString().slice(0,10);
  }

  function recalcTotal(){
    if(!selected) return;
    const perDay = parsePriceCZK(selected.price);
    const days = daysBetween(fOd.value, fDo.value);
    const disc = discountForDays(days);
    const total = perDay * days * (1 - disc/100);
    pricePerDayEl.textContent = formatCzk(perDay) + ' / den';
    priceTotalEl.textContent = formatCzk(total);
    appliedDiscountEl.textContent = disc ? `Uplatněná sleva ${disc}% (${days} dní)` : '';
  }

  [fOd, fDo].forEach(el => el && el.addEventListener('change', recalcTotal));

  function openModal(car){
    selected = car;
    mImg.src = car.image; mImg.alt = car.name;
    mTitle.textContent = car.name;
    fVozidlo.value = car.name;
    mFacts.innerHTML = `
      <li class="list-group-item"><i class="fa-solid fa-circle-check me-2"></i>Dostupnost: ${car.available ? 'Možné pronajmout' : 'Není dostupné'}</li>
      <li class="list-group-item"><i class="fa-solid fa-wrench me-2"></i>Úpravy: ${car.tuning ? 'Je upravené' : 'Žádné úpravy'}</li>
      <li class="list-group-item"><i class="fa-solid fa-screwdriver-wrench me-2"></i>Tuningové díly: ${car.parts || 'Neuvedeno'}</li>
      <li class="list-group-item"><i class="fa-solid fa-paint-roller me-2"></i>Polep: ${car.wrap ? 'S polepem' : 'Bez polepu'}</li>
      <li class="list-group-item"><i class="fa-solid fa-gauge-high me-2"></i>Nejvyšší rychlost: ${car.speed || 'Neuvedeno'}</li>
      <li class="list-group-item"><i class="fa-solid fa-euro-sign me-2"></i>Cena za den: ${car.price}</li>
      <li class="list-group-item"><i class="fa-solid fa-leaf me-2"></i>Eco doporučení: ${isEcoRecommended(car) ? 'Ano (odhad podle roku výroby)' : 'Ne (starší model)'}</li>
    `;
    mStatus.innerHTML = '';
    mForm.reset();
    initDates();
    recalcTotal();
    modal.show();
  }

  mForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(mForm);
    const d = Object.fromEntries(fd.entries());
    const email = String(d.email || '').trim();
    if(!email.endsWith('@post.ic')){
      mStatus.innerHTML = '<div class="alert alert-danger">Email musí končit na <strong>@post.ic</strong>.</div>';
      return;
    }
    const perDay = selected ? parsePriceCZK(selected.price) : 0;
    const days = daysBetween(d.od, d.do);
    const disc = discountForDays(days);
    const total = perDay * days * (1 - disc/100);
    const embed = {
      username: 'Premium Cars',
      avatar_url: 'https://i.imgur.com/RL90ReM.png',
      embeds: [{
        title: 'Nová objednávka vozidla',
        color: 0x002e6c,
        thumbnail: { url: 'https://i.imgur.com/RL90ReM.png' },
        fields: [
          { name: 'Jméno a příjmení', value: d.jmeno, inline: true },
          { name: 'Telefon', value: d.telefon, inline: true },
          { name: 'Email', value: d.email, inline: true },
          { name: 'Vozidlo', value: d.vozidlo, inline: true },
          { name: 'Datum převzetí', value: d.od, inline: true },
          { name: 'Datum vrácení', value: d.do, inline: true },
          { name: 'Počet dní', value: String(days), inline: true },
          { name: 'Cena za den', value: formatCzk(perDay), inline: true },
          { name: 'Sleva', value: disc ? `${disc}%` : '—', inline: true },
          { name: 'Cena celkem', value: formatCzk(total), inline: false }
        ],
        footer: { text: 'Všechna práva vyhrazena Premium Cars', icon_url: 'https://i.imgur.com/RL90ReM.png' },
        timestamp: new Date().toISOString()
      }]
    };
    fetch('https://sqmal.eu/artic/premiumcars.php', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(embed)
    })
    .then(() => {
      mStatus.innerHTML = '<div class="alert alert-success">Objednávka odeslána.</div>';
      mForm.reset();
    })
    .catch(() => {
      mStatus.innerHTML = '<div class="alert alert-danger">Chyba při odesílání.</div>';
    });
  });

  if (ecoCalcBtn) {
    ecoCalcBtn.addEventListener('click', () => {
      const km = Math.max(0, Number(ecoKm.value || 0));
      const l100 = Math.max(0, Number(ecoL100.value || 0));
      const liters = (km * l100) / 100;
      const factor = ecoFuel.value === 'diesel' ? 2.62 : 2.31;
      const co2kg = liters * factor;
      ecoResult.innerHTML = `
        <div class="rounded-3 p-3 bg-eco-subtle">
          <div><strong>Odhad spotřeby:</strong> ${liters.toFixed(1)} l</div>
          <div><strong>Odhad CO₂:</strong> ${co2kg.toFixed(1)} kg</div>
          <div class="text-secondary mt-1">Výpočet je orientační a závisí na modelu a jízdním stylu.</div>
        </div>
      `;
    });
  }
})();

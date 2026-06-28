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

  const toast = Swal.mixin({
    toast:true,
    position:'top-end',
    showConfirmButton:false,
    timer:2600,
    timerProgressBar:true
  });

  document.addEventListener('DOMContentLoaded', () => {
    fetch('data/cars.json')
      .then(r => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then(d => {
        cars = Array.isArray(d) ? d : [];
        view = [...cars];
        render();
      })
      .catch(() => {
        Swal.fire({
          icon:'error',
          title:'Chyba načítání',
          text:'Nepodařilo se načíst seznam vozidel.'
        });
      });

    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
  });

  [search, sortSel, onlyAvail, onlyEco].forEach(el => el && el.addEventListener('input', applyFilters));
  [fOd, fDo].forEach(el => el && el.addEventListener('change', recalcTotal));

  function modelYearFromName(name){
    const m = String(name || '').match(/^(\d{4})/);
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
      const okQuery = !q || String(c.name || '').toLowerCase().includes(q);
      const okEco = !onlyEco?.checked || isEcoRecommended(c);
      return okAvail && okQuery && okEco;
    });

    sortView();
    render();
  }

  function parsePriceCZK(str){
    return Number(String(str || '').replace(/[^0-9]/g,'') || 0);
  }

  function parseSpeed(str){
    return Number(String(str || '').replace(/[^0-9]/g,'') || 0);
  }

  function formatCzk(n){
    return new Intl.NumberFormat('cs-CZ').format(Math.max(0, Math.round(n))) + ' Kč';
  }

  function daysBetween(a, b){
    if (!a || !b) return 1;
    const d1 = new Date(a);
    const d2 = new Date(b);
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
    if(v === 'nameAsc') view.sort((a,b)=> String(a.name || '').localeCompare(String(b.name || ''),'cs'));
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

  function escapeHtml(value){
    return String(value ?? '').replace(/[&<>"']/g, s => ({
      '&':'&amp;',
      '<':'&lt;',
      '>':'&gt;',
      '"':'&quot;',
      "'":'&#039;'
    }[s]));
  }

  function renderCard(car){
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-lg-4';

    const badges = [
      car.tuning ? '<span class="badge badge-soft"><i class="fa-solid fa-wrench me-1"></i>Tuning</span>' : '',
      car.wrap ? '<span class="badge badge-soft"><i class="fa-solid fa-swatchbook me-1"></i>Polep</span>' : '',
      `<span class="badge badge-soft"><i class="fa-solid fa-gauge-high me-1"></i>${escapeHtml(car.speed)}</span>`,
      isEcoRecommended(car) ? '<span class="badge badge-eco"><i class="fa-solid fa-leaf me-1"></i>Eco doporučeno</span>' : ''
    ].join('');

    col.innerHTML = `
      <div class="card h-100 car">
        <div class="ratio ratio-16x9 overflow-hidden">
          <img src="${escapeHtml(car.image)}" alt="${escapeHtml(car.name)}" class="w-100 h-100 object-fit-cover" loading="lazy" decoding="async" referrerpolicy="no-referrer" />
        </div>
        <div class="card-body d-flex flex-column p-4">
          <div class="d-flex justify-content-between align-items-start gap-3">
            <h3 class="h5 fw-semibold mb-1">${escapeHtml(car.name)}</h3>
            <span class="badge-status ${car.available ? 'badge-available' : 'badge-unavailable'}">${car.available ? 'Dostupné' : 'Nedostupné'}</span>
          </div>
          <div class="d-flex flex-wrap gap-2 mt-2">${badges}</div>
          <div class="mt-4">
            <div class="small text-muted-custom">Cena za den</div>
            <span class="fs-5 fw-bold">${escapeHtml(car.price)}</span>
          </div>
          <div class="mt-auto pt-4 d-grid">
            <button class="btn btn-primary" data-car-id="${escapeHtml(car.id)}"><i class="fa-solid fa-eye me-2"></i>Zobrazit detail</button>
          </div>
        </div>
      </div>`;

    col.querySelector('button').addEventListener('click', () => openModal(car));
    return col;
  }

  function initDates(){
    const today = new Date();
    const plus3 = new Date(today);
    plus3.setDate(today.getDate()+3);

    fOd.min = today.toISOString().slice(0,10);
    fDo.min = today.toISOString().slice(0,10);
    fOd.value = today.toISOString().slice(0,10);
    fDo.value = plus3.toISOString().slice(0,10);
  }

  function recalcTotal(){
    if(!selected) return;

    if (fOd.value && fDo.value && new Date(fDo.value) <= new Date(fOd.value)) {
      const next = new Date(fOd.value);
      next.setDate(next.getDate() + 1);
      fDo.value = next.toISOString().slice(0,10);
    }

    const perDay = parsePriceCZK(selected.price);
    const days = daysBetween(fOd.value, fDo.value);
    const disc = discountForDays(days);
    const total = perDay * days * (1 - disc/100);

    pricePerDayEl.textContent = formatCzk(perDay) + ' / den';
    priceTotalEl.textContent = formatCzk(total);
    appliedDiscountEl.textContent = disc ? `Uplatněná sleva ${disc} % (${days} dní)` : `${days} dní bez slevy`;
  }

  function openModal(car){
    selected = car;

    mImg.src = car.image;
    mImg.alt = car.name;
    mImg.decoding = 'async';
    fVozidlo.value = car.name;
    mTitle.textContent = car.name;

    mFacts.innerHTML = `
      <li><i class="fa-solid fa-circle-check"></i><span>Dostupnost: ${car.available ? 'Možné pronajmout' : 'Momentálně nedostupné'}</span></li>
      <li><i class="fa-solid fa-wrench"></i><span>Úpravy: ${car.tuning ? 'Vozidlo je upravené' : 'Bez úprav'}</span></li>
      <li><i class="fa-solid fa-screwdriver-wrench"></i><span>Tuningové díly: ${escapeHtml(car.parts || 'Neuvedeno')}</span></li>
      <li><i class="fa-solid fa-paint-roller"></i><span>Polep: ${car.wrap ? 'S polepem' : 'Bez polepu'}</span></li>
      <li><i class="fa-solid fa-gauge-high"></i><span>Nejvyšší rychlost: ${escapeHtml(car.speed || 'Neuvedeno')}</span></li>
      <li><i class="fa-solid fa-coins"></i><span>Cena za den: ${escapeHtml(car.price)}</span></li>
      <li><i class="fa-solid fa-leaf"></i><span>Eco doporučení: ${isEcoRecommended(car) ? 'Ano, novější model' : 'Ne, starší model'}</span></li>
    `;

    mForm.reset();
    initDates();
    recalcTotal();
    modal.show();
  }

  mForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!selected) {
      Swal.fire({
        icon:'error',
        title:'Chybí vozidlo',
        text:'Nejdříve vyberte vozidlo z nabídky.'
      });
      return;
    }

    const fd = new FormData(mForm);
    const d = Object.fromEntries(fd.entries());
    const email = String(d.email || '').trim();

    if(!email.endsWith('@post.ic')){
      Swal.fire({
        icon:'warning',
        title:'Neplatný email',
        text:'Email musí končit na @post.ic.'
      });
      return;
    }

    if (!document.getElementById('consent').checked) {
      Swal.fire({
        icon:'warning',
        title:'Chybí souhlas',
        text:'Pro odeslání objednávky musíte souhlasit s podmínkami Premium Cars.'
      });
      return;
    }

    const perDay = parsePriceCZK(selected.price);
    const days = daysBetween(d.od, d.do);
    const disc = discountForDays(days);
    const total = perDay * days * (1 - disc/100);

    const confirm = await Swal.fire({
      icon:'question',
      title:'Odeslat objednávku?',
      html:`<div style="text-align:left">
        <div><strong>Vozidlo:</strong> ${escapeHtml(d.vozidlo)}</div>
        <div><strong>Termín:</strong> ${escapeHtml(d.od)} až ${escapeHtml(d.do)}</div>
        <div><strong>Počet dní:</strong> ${days}</div>
        <div><strong>Celkem:</strong> ${formatCzk(total)}</div>
      </div>`,
      showCancelButton:true,
      confirmButtonText:'Ano, odeslat',
      cancelButtonText:'Zrušit'
    });

    if (!confirm.isConfirmed) return;

    const embed = {
      username: 'Premium Cars',
      avatar_url: 'https://i.imgur.com/RL90ReM.png',
      embeds: [{
        title: 'Nová objednávka vozidla',
        color: 0x09090b,
        thumbnail: { url: selected.image || 'https://i.imgur.com/RL90ReM.png' },
        fields: [
          { name: 'Jméno a příjmení', value: d.jmeno || 'Neuvedeno', inline: true },
          { name: 'Telefon', value: d.telefon || 'Neuvedeno', inline: true },
          { name: 'Email', value: d.email || 'Neuvedeno', inline: true },
          { name: 'Vozidlo', value: d.vozidlo || 'Neuvedeno', inline: true },
          { name: 'Datum převzetí', value: d.od || 'Neuvedeno', inline: true },
          { name: 'Datum vrácení', value: d.do || 'Neuvedeno', inline: true },
          { name: 'Počet dní', value: String(days), inline: true },
          { name: 'Cena za den', value: formatCzk(perDay), inline: true },
          { name: 'Sleva', value: disc ? `${disc} %` : '—', inline: true },
          { name: 'Cena celkem', value: formatCzk(total), inline: false }
        ],
        footer: { text: 'Premium Cars', icon_url: 'https://i.imgur.com/RL90ReM.png' },
        timestamp: new Date().toISOString()
      }]
    };

    Swal.fire({
      title:'Odesílám objednávku',
      text:'Prosím vyčkejte.',
      allowOutsideClick:false,
      allowEscapeKey:false,
      didOpen:() => Swal.showLoading()
    });

    try {
      const res = await fetch('https://sqmal.eu/artic/premiumcars.php', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body:JSON.stringify(embed)
      });

      if (!res.ok) throw new Error();

      await Swal.fire({
        icon:'success',
        title:'Objednávka odeslána',
        text:'Vaše rezervace byla úspěšně odeslána.',
        confirmButtonText:'Hotovo'
      });

      mForm.reset();
      modal.hide();
    } catch {
      Swal.fire({
        icon:'error',
        title:'Chyba při odesílání',
        text:'Objednávku se nepodařilo odeslat. Zkuste to prosím znovu.'
      });
    }
  });

  if (ecoCalcBtn) {
    ecoCalcBtn.addEventListener('click', () => {
      const km = Math.max(0, Number(ecoKm.value || 0));
      const l100 = Math.max(0, Number(ecoL100.value || 0));

      if (!km || !l100) {
        Swal.fire({
          icon:'warning',
          title:'Chybí údaje',
          text:'Vyplňte trasu a spotřebu.'
        });
        return;
      }

      const liters = (km * l100) / 100;
      const factor = ecoFuel.value === 'diesel' ? 2.62 : 2.31;
      const co2kg = liters * factor;
      const fuelName = ecoFuel.value === 'diesel' ? 'nafta' : 'benzín';

      ecoResult.innerHTML = `
        <div class="notice success">
          <i class="fa-solid fa-leaf"></i>
          <span>
            <strong>Odhad spotřeby:</strong> ${liters.toFixed(1)} l<br>
            <strong>Odhad CO₂:</strong> ${co2kg.toFixed(1)} kg<br>
            <span class="text-muted-custom">Výpočet je orientační. Palivo: ${fuelName}.</span>
          </span>
        </div>
      `;

      toast.fire({
        icon:'success',
        title:'Výpočet hotový'
      });
    });
  }
})();
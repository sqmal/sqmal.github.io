(() => {
  const BONUS_PAID_TOTAL_CZK = 1215228;

  const fleetData = [
    { model: 'Toyota Prius', year: 2011, type: 'Hatchback', count: 1 },
    { model: 'Chevrolet C-K Cheyenne', year: 1994, type: 'Pickup', count: 3 },
    { model: 'Suzuki Bandit', year: 2011, type: 'Motocykl', count: 3 },
    { model: 'BMW M135i', year: 2014, type: 'Hatchback', count: 3 },
    { model: 'Mercedes-Benz Sprinter', year: 2019, type: 'Dodávka', count: 1 },
    { model: 'Freightliner THX8500', year: 1996, type: 'Tahač', count: 1 },
    { model: 'Scania R580 V8', year: 2011, type: 'Tahač', count: 2 },
    { model: 'Adjutor S/Y', year: 2002, type: 'Lodní jednotka', count: 1 }
  ];

  const roles = [
    { name: 'Řidič kamionu', group: 'A', short: 'Trasy po městě i mimo', tasks: ['Vnitrostátní i meziměstské trasy', 'Bezpečnost a dodržení termínů', 'Směny podle plánu'] },
    { name: 'Opravář elektrického vedení', group: 'A', short: 'Servis a opravy v terénu', tasks: ['Servis a opravy vedení', 'Práce v terénu', 'Koordinace s dispečinkem'] },
    { name: 'Kapitán nákladní lodě', group: 'A', short: 'Loď, posádka a náklad', tasks: ['Řízení lodě a posádky', 'Náklad a logistika', 'Bezpečnostní standardy'] },
    { name: 'Kurýr/Strážce objektů', label: 'Kurýr / Strážce objektů', group: 'B', short: 'Doručování a ostraha', tasks: ['Doručování zásilek', 'Ostraha a dohled', 'Směnný provoz'] }
  ];
  const goals = { A: '500 000 Kč', B: '125 000 Kč' };
  const tops = { A: '20 000 Kč', B: '10 000 Kč' };
  let roleFilter = 'all';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const fleetGrid = $('#fleetGrid');
  const fleetSearch = $('#fleetSearch');
  const fleetEmpty = $('#fleetEmpty');
  const applyForm = $('#applyForm');
  const roleInput = $('#applyRole');
  const rolePick = $('#rolePick');
  const msg = $('#msg');
  const msgBody = $('#msgBody');
  let sortMode = 'name';

  function formatCZK(n) {
    try {
      return Number(n).toLocaleString('cs-CZ', { style: 'currency', currency: 'CZK', maximumFractionDigits: 0 });
    } catch {
      return `${n} Kč`;
    }
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, s => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[s]));
  }

  function ecoRecommended(year) {
    return year >= 2011;
  }

  function renderFleet() {
    const q = (fleetSearch.value || '').toLowerCase().trim();
    const list = [...fleetData]
      .sort((a, b) => {
        if (sortMode === 'yearDesc') return b.year - a.year;
        if (sortMode === 'yearAsc') return a.year - b.year;
        return a.model.localeCompare(b.model, 'cs');
      })
      .filter(item => !q || item.model.toLowerCase().includes(q) || String(item.year).includes(q));

    fleetEmpty.hidden = list.length > 0;
    fleetGrid.innerHTML = list.map(item => `
      <article class="unit">
        <div class="unit-top"><span class="unit-count">×${item.count}</span></div>
        <div><h3>${escapeHtml(item.model)}</h3><p>${escapeHtml(item.type)}</p></div>
        <div class="unit-meta"><span>Rok <b class="num">${item.year}</b></span>${ecoRecommended(item.year) ? '<span class="eco-tag">Eco doporučeno</span>' : '<span>Palivo: firemní</span>'}</div>
      </article>`).join('');
  }

  function renderRoles() {
    const list = roles.filter(r => roleFilter === 'all' || r.group === roleFilter);
    $('#roleList').innerHTML = list.map(r => `
      <article class="role">
        <div class="role-head">
          <div><h3>${escapeHtml(r.label || r.name)}</h3><p>${escapeHtml(r.short)}</p></div>
          <span class="role-tag">Skupina ${r.group}</span>
        </div>
        <ul class="role-tasks">${r.tasks.map(t => `<li>${escapeHtml(t)}</li>`).join('')}</ul>
        <div class="role-facts">
          <div><span>Cíl zkušební doby</span><b class="num">${goals[r.group]}</b></div>
          <div><span>Fixní plat až</span><b class="num">${tops[r.group]}</b></div>
        </div>
        <div class="role-act"><button class="btn btn-dark apply-btn" data-role="${escapeHtml(r.name)}">Mám zájem</button><a class="btn btn-grey" href="#pay">Odměny</a></div>
      </article>`).join('');
    $$('.apply-btn', $('#roleList')).forEach(b => b.addEventListener('click', e => {
      selectRole(e.currentTarget.dataset.role);
      $('#apply').scrollIntoView({ behavior: 'smooth' });
    }));
  }

  function openMsg(html) {
    msgBody.innerHTML = html;
    if (!msg.open) msg.showModal();
  }

  function closeMsg() {
    if (msg.open) msg.close();
  }

  function showError(text) {
    openMsg(`<div class="msg-ico warn">!</div><h3>Nelze pokračovat</h3><p>${escapeHtml(text)}</p><div class="msg-btns"><button class="btn btn-dark" data-close>Rozumím</button></div>`);
  }

  function confirmSend(d) {
    return new Promise(resolve => {
      openMsg(`<div class="msg-ico">?</div><h3>Odeslat přihlášku?</h3>
        <div class="msg-list">
          <div><span>Jméno</span><b>${escapeHtml(d.name || '-')}</b></div>
          <div><span>Email</span><b>${escapeHtml(d.email || '-')}</b></div>
          <div><span>Telefon</span><b>${escapeHtml(d.phone || '-')}</b></div>
          <div><span>Pozice</span><b>${escapeHtml(d.role || '-')}</b></div>
        </div>
        <div class="msg-btns"><button class="btn btn-light" data-no>Zrušit</button><button class="btn btn-dark" data-yes>Ano, odeslat</button></div>`);
      $('[data-yes]', msgBody).onclick = () => resolve(true);
      $('[data-no]', msgBody).onclick = () => { closeMsg(); resolve(false); };
      msg.addEventListener('close', () => resolve(false), { once: true });
    });
  }

  function selectRole(value) {
    roleInput.value = value;
    $$('button', rolePick).forEach(b => b.classList.toggle('active', b.dataset.v === value));
    rolePick.classList.remove('err');
  }

  document.addEventListener('DOMContentLoaded', () => {
    $('#year').textContent = new Date().getFullYear();
    $('#bonusPaid').textContent = formatCZK(BONUS_PAID_TOTAL_CZK);
    renderFleet();
    renderRoles();
  });

  const menuBtn = $('.menu-btn');
  const navLinks = $('#nav-links');
  menuBtn.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
  $$('a', navLinks).forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }));

  $$('[data-filter]').forEach(btn => btn.addEventListener('click', () => {
    const group = btn.dataset.filter;
    roleFilter = group;
    renderRoles();
    $$('[data-filter]').forEach(b => b.classList.toggle('active', b === btn));
  }));

  $$('button', rolePick).forEach(b => b.addEventListener('click', () => selectRole(b.dataset.v)));

  $$('#fleetSort button').forEach(b => b.addEventListener('click', () => {
    sortMode = b.dataset.sort;
    $$('#fleetSort button').forEach(x => x.classList.toggle('active', x === b));
    renderFleet();
  }));
  fleetSearch.addEventListener('input', renderFleet);

  $$('[data-open="terms"]').forEach(b => b.addEventListener('click', () => $('#terms').showModal()));
  $$('.modal').forEach(m => {
    m.addEventListener('click', e => {
      if (e.target === m || e.target.closest('.modal-close') || e.target.closest('[data-close]')) m.close();
    });
  });

  $$('input', applyForm).forEach(i => i.addEventListener('input', () => i.classList.remove('err')));

  applyForm.addEventListener('submit', async e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(applyForm).entries());
    const terms = $('#terms');

    if (!String(d.email || '').includes('@') || !d.role) {
      if (!String(d.email || '').includes('@')) applyForm.email.classList.add('err');
      if (!d.role) rolePick.classList.add('err');
      showError('Zkontrolujte email a výběr pozice.');
      return;
    }

    if (!terms.checked) {
      showError('Pro odeslání přihlášky musíte souhlasit s podmínkami TTL.');
      return;
    }

    if (!(await confirmSend(d))) return;

    openMsg('<div class="spin"></div><h3>Odesílám přihlášku</h3><p>Prosím vyčkejte.</p>');

    const payload = {
      username: 'TTL – Tactical Transport Logistics',
      embeds: [{
        title: 'Nová přihláška',
        color: 0x60a5fa,
        fields: [
          { name: 'Jméno', value: d.name || '-', inline: true },
          { name: 'Email', value: d.email || '-', inline: true },
          { name: 'Telefon', value: d.phone || '-', inline: true },
          { name: 'Pozice', value: d.role || '-', inline: false }
        ],
        timestamp: new Date().toISOString()
      }]
    };

    try {
      const res = await fetch('https://sqmal.eu/artic/premiumcars.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error();
      applyForm.reset();
      selectRole('');
      openMsg('<div class="msg-ico ok">✓</div><h3>Přihláška odeslána</h3><p>Vaše přihláška byla úspěšně odeslána.</p><div class="msg-btns"><button class="btn btn-dark" data-close>Hotovo</button></div>');
    } catch {
      showError('Přihlášku se nepodařilo odeslat. Zkuste to prosím znovu.');
    }
  });
})();

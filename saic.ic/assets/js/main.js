document.addEventListener('DOMContentLoaded', () => {
  const fmt = new Intl.NumberFormat('cs-CZ');
  const czk = new Intl.NumberFormat('cs-CZ', { style: 'currency', currency: 'CZK', maximumFractionDigits: 0 });

  const KPIS = { cash: 1900000, debt: 0, own: 6923 };
  const portfolio = [
    { name:'Tactical Transport Logistics a.s.', count:2500, share:25.00 },
    { name:'Premium Cars', count:2498, share:24.98 },
    { name:'Piece of Peace', count:125, share:1.25 },
    { name:'Nice Buns', count:100, share:1.00 },
    { name:'Sprunk', count:100, share:1.00 },
    { name:"Arthur’s BBQ", count:25, share:0.25 },
    { name:'Canny Bus Group', count:25, share:0.25 },
    { name:'Redwood Cigarettes', count:25, share:0.25 },
    { name:'Ammu-Nation', count:10, share:0.10 }
  ];

  function setText(id, text){ const el = document.getElementById(id); if(el) el.textContent = text; }
  setText('kpiCash', czk.format(KPIS.cash));
  setText('kpiDebt', czk.format(KPIS.debt));
  setText('kpiOwn', fmt.format(KPIS.own) + ' ks (69,23 %)');

  const grid = document.getElementById('portfolioGrid');
  function renderPortfolio(items){
    if(!grid) return;
    grid.innerHTML = '';
    items.forEach(p => {
      const col = document.createElement('div');
      col.className = 'col-12 col-sm-6 col-lg-4';
      col.innerHTML =
        '<div class="glass p-3 h-100 glass-hover">' +
          '<div class="d-flex justify-content-between align-items-start">' +
            '<h3 class="h6 mb-2">' + p.name + '</h3>' +
            '<span class="badge text-bg-dark border border-1">' + p.share.toFixed(2) + ' %</span>' +
          '</div>' +
          '<div class="muted">Počet: <strong>' + fmt.format(p.count) + '</strong> ks</div>' +
        '</div>';
      grid.appendChild(col);
    });
  }
  function applyFilters(){
    const q = (document.getElementById('search').value || '').toLowerCase().trim();
    const sortBy = document.getElementById('sort').value;
    let items = portfolio.filter(p => p.name.toLowerCase().includes(q));
    if(sortBy === 'name') items.sort((a,b)=>a.name.localeCompare(b.name,'cs'));
    if(sortBy === 'share') items.sort((a,b)=>b.share - a.share);
    if(sortBy === 'count') items.sort((a,b)=>b.count - a.count);
    renderPortfolio(items);
  }
  const searchEl = document.getElementById('search');
  const sortEl = document.getElementById('sort');
  if(searchEl) searchEl.addEventListener('input', applyFilters);
  if(sortEl) sortEl.addEventListener('change', applyFilters);
  renderPortfolio(portfolio);

  function calcScenarios(){
    const inv    = Number(document.getElementById('invAmount').value) || 0;
    const price  = Number(document.getElementById('sharePrice').value) || 0;
    const wDiv   = Number(document.getElementById('weeklyDiv').value) || 0;
    const months = Number(document.getElementById('horizon').value) || 12;

    const shares = price>0 ? inv / price : 0;
    const period = months / 12;

    const simRow = document.getElementById('simCards');
    if(!simRow) return;
    simRow.querySelectorAll('.scenario-col').forEach(n=>n.remove());

    const scenarios = [
      { key:'Pesimistický', dMul:0.70, pMul:0.90 },
      { key:'Realistický',  dMul:1.10, pMul:1.05 },
      { key:'Optimistický', dMul:1.20, pMul:1.10 }
    ];

    scenarios.forEach(s => {
      const yearlyDividend = shares * wDiv * 52 * s.dMul * period;
      const newPrice = price * s.pMul;
      const priceGain = shares * (newPrice - price) * period;
      const total = yearlyDividend + priceGain;

      const col = document.createElement('div');
      col.className = 'col-12 col-md-6 col-lg-3 scenario-col';
      const monthsLabel = months + (months === 1 ? ' měsíc' : ' měsíců');

      col.innerHTML =
        '<div class="glass p-3 h-100 glass-hover scenario">' +
          '<div class="d-flex justify-content-between align-items-center">' +
            '<h3 class="h6 mb-0">' + s.key + '</h3>' +
            '<span class="tag">' + monthsLabel + '</span>' +
          '</div>' +
          '<div class="mt-3"><div class="muted">Odhad roční dividendy</div><div class="fw-bold">' + czk.format(Math.round(yearlyDividend)) + '</div></div>' +
          '<div class="mt-2"><div class="muted">Zisk/ztráta z ceny</div><div class="fw-bold">' + czk.format(Math.round(priceGain)) + '</div></div>' +
          '<div class="divider my-2"></div>' +
          '<div class="muted">Celkový výnos</div>' +
          '<div class="fs-5 fw-bold">' + czk.format(Math.round(total)) + '</div>' +
          '<div class="small muted mt-2">Modelový odhad – nejedná se o investiční doporučení.</div>' +
        '</div>';

      simRow.appendChild(col);
    });
  }
  const calcBtn = document.getElementById('calc');
  if(calcBtn) calcBtn.addEventListener('click', calcScenarios);
  calcScenarios();

  const toTop = document.getElementById('toTop');
  if(toTop){ toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' })); }
});
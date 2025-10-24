document.addEventListener('DOMContentLoaded', () => {
  const fmt = new Intl.NumberFormat('cs-CZ');
  const czk = new Intl.NumberFormat('cs-CZ', { style: 'currency', currency: 'CZK', maximumFractionDigits: 0 });

  const KPIS = { cash: 117000, debt: 0, own: 9916 };

  const portfolio = [
    { name:'Tactical Transport Logistics a.s.', count:2500, share:25.00, ecoLevel:'eco', eco:true },
    { name:'Premium Cars', count:2498, share:24.98, ecoLevel:'eco', eco:true },
    { name:'Piece of Peace', count:125, share:1.25, ecoLevel:null, eco:false },
    { name:'Nice Buns', count:100, share:1.00, ecoLevel:null, eco:false },
    { name:'Sprunk', count:100, share:1.00, ecoLevel:null, eco:false },
    { name:"Arthur’s BBQ", count:25, share:0.25, ecoLevel:null, eco:false },
    { name:'Canny Bus Group', count:25, share:0.25, ecoLevel:'eco-plus', eco:true },
    { name:'Redwood Cigarettes', count:25, share:0.25, ecoLevel:null, eco:false },
    { name:'Ammu-Nation', count:10, share:0.10, ecoLevel:null, eco:false },
    { name:"Pay 'n' Spray", count:5, share:0.05, ecoLevel:null, eco:false }
  ];

  const announcements = [
    { datetime:'2025-10-21T02:02:00', label:'Záměr nákupu', company:"Pay 'n' Spray", counterparty:'Sphere Corporation', qty:5, unitPrice:399000, change:'new' }
  ];

  function setText(id, text){ const el = document.getElementById(id); if(el) el.textContent = text; }
  setText('kpiCash', czk.format(KPIS.cash));
  setText('kpiDebt', czk.format(KPIS.debt));
  setText('kpiOwn', fmt.format(KPIS.own) + ' ks (99,16 %)');

  function computeChangeMap(anns){
    const map = {};
    anns.forEach(a => { map[a.company] = a.change; });
    return map;
  }
  const changeMap = computeChangeMap(announcements);

  const grid = document.getElementById('portfolioGrid');
  const emptyState = document.getElementById('emptyState');

  function levelBadge(level){
    if(!level) return '';
    const label = level==='eco-plus'?'ECO+':(level==='eco-asterisk'?'ECO*':'ECO');
    return '<span class="eco-badge" data-level="'+level+'">'+label+'</span>';
  }
  function changeBadge(kind){
    if(!kind) return '';
    if(kind==='new') return '<span class="badge-change new"><i class="fa-solid fa-sparkles"></i>Nové</span>';
    if(kind==='up') return '<span class="badge-change up"><i class="fa-solid fa-arrow-trend-up"></i>Zvýšen podíl</span>';
    if(kind==='down') return '<span class="badge-change down"><i class="fa-solid fa-arrow-trend-down"></i>Snížen podíl</span>';
    return '';
  }

  function renderPortfolio(items){
    grid.innerHTML = '';
    if(!items.length){ emptyState.classList.remove('d-none'); return; }
    emptyState.classList.add('d-none');
    items.forEach(p => {
      const level = levelBadge(p.ecoLevel);
      const change = changeBadge(changeMap[p.name]);
      const col = document.createElement('div');
      col.className = 'col-12 col-sm-6 col-lg-4';
      col.innerHTML =
        '<div class="glass p-3 h-100 glass-hover">' +
          '<div class="d-flex justify-content-between align-items-start flex-wrap gap-2">' +
            '<h3 class="h6 mb-2 d-flex align-items-center gap-2">' + p.name + (p.eco?(' '+level):'') + '</h3>' +
            '<div class="d-flex align-items-center gap-2">' +
              change +
              '<span class="badge text-bg-dark border border-1">' + p.share.toFixed(2) + ' %</span>' +
            '</div>' +
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
  const clearSearch = document.getElementById('clearSearch');
  if(searchEl) searchEl.addEventListener('input', applyFilters);
  if(sortEl) sortEl.addEventListener('change', applyFilters);
  if(clearSearch) clearSearch.addEventListener('click', ()=>{ document.getElementById('search').value=''; applyFilters(); });
  renderPortfolio(portfolio);

  function renderAnnouncements(){
    const host = document.getElementById('timeline');
    if(!host) return;
    if(!announcements.length){
      host.textContent = 'Momentálně nejsou zveřejněna žádná oznámení.';
      return;
    }
    host.innerHTML = '';
    announcements.forEach(a => {
      const total = a.qty * a.unitPrice;
      const dt = new Date(a.datetime);
      const ts = dt.toLocaleString('cs-CZ', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' });
      const item = document.createElement('div');
      item.className = 'glass p-3 mb-2';
      item.innerHTML =
        '<div class="d-flex justify-content-between align-items-center">' +
          '<div class="fw-bold">' + a.label + '</div>' +
          '<span class="pill">' + ts + '</span>' +
        '</div>' +
        '<div class="mt-1">' + a.company + ' – <strong>' + fmt.format(a.qty) + '</strong> ks</div>' +
        '<div class="muted small">Proti-strana: ' + a.counterparty + ' · Jednotková cena: <strong>' + czk.format(a.unitPrice) + '</strong> · Odhadovaný objem: <strong>' + czk.format(total) + '</strong></div>';
      host.appendChild(item);
    });
  }
  renderAnnouncements();

  const mToday = 145000;
  const mAvg = -13000;
  const mWeekPerShare = 54;

  function setMetrics(){
    const sign = v => v>=0 ? czk.format(v) : '-' + czk.format(Math.abs(v));
    const t = document.getElementById('mToday');
    const a = document.getElementById('mAvg');
    const w = document.getElementById('mWeek');
    if(t) t.textContent = sign(mToday);
    if(a) a.textContent = czk.format(mAvg);
    if(w) w.textContent = mWeekPerShare.toLocaleString('cs-CZ') + ' Kč';
  }
  setMetrics();

  const MARKET = { maxPerIssuer: 10000, available: 10000 };
  const ASSUME = {
    sharePrice: 15525,
    dailyProfitPerShare: 54,
    hitRate: 0.6,
    moves: { pess:-0.10, real:0.05, opti:0.15 }
  };

  function maxBuyable(inv){
    const byCash = Math.floor(inv / Math.max(1, ASSUME.sharePrice));
    return Math.max(0, Math.min(byCash, MARKET.available, MARKET.maxPerIssuer));
  }

  function simulateSimple(inv, months, move){
    const days = Math.max(1, Math.round(months*30));
    const shares = maxBuyable(inv);
    const cash = inv - shares * ASSUME.sharePrice;
    const paidDays = Math.round(days * ASSUME.hitRate);
    const dividends = shares * ASSUME.dailyProfitPerShare * paidDays;
    const finalPrice = ASSUME.sharePrice * (1 + move);
    const valueEnd = shares * finalPrice + cash + dividends;
    const pl = valueEnd - inv;
    return { shares, cash, dividends, finalPrice, valueEnd, pl };
  }

  function updateBuyBox(){
    const inv = Number(document.getElementById('invAmount').value)||0;
    const shares = maxBuyable(inv);
    const cur = document.getElementById('curPriceBox');
    const qty = document.getElementById('buyableShares');
    if(cur) cur.textContent = czk.format(ASSUME.sharePrice);
    if(qty) qty.textContent = fmt.format(shares);
  }

  function renderSimulator(){
    const simRow = document.getElementById('simCards');
    if(!simRow) return;
    simRow.querySelectorAll('.scenario-col').forEach(n=>n.remove());
    const inv = Number(document.getElementById('invAmount').value)||0;
    const months = Number(document.getElementById('horizon').value)||12;

    const s1 = simulateSimple(inv, months, ASSUME.moves.pess);
    const s2 = simulateSimple(inv, months, ASSUME.moves.real);
    const s3 = simulateSimple(inv, months, ASSUME.moves.opti);

    [
      { key:'Pesimistický', d:s1 },
      { key:'Realistický', d:s2 },
      { key:'Optimistický', d:s3 }
    ].forEach(s=>{
      const col = document.createElement('div');
      col.className = 'col-12 col-md-6 col-lg-3 scenario-col';
      col.innerHTML =
        '<div class="glass p-3 h-100 glass-hover scenario">' +
          '<div class="d-flex justify-content-between align-items-center">' +
            '<h3 class="h6 mb-0">' + s.key + '</h3>' +
            '<span class="tag">' + months + ' měsíců</span>' +
          '</div>' +
          '<div class="mt-2 muted small">Aktuální cena akcie: <strong>' + czk.format(ASSUME.sharePrice) + '</strong></div>' +
          '<div class="muted small">Za tuto investici: <strong>' + fmt.format(s.d.shares) + '</strong> ks</div>' +
          '<div class="mt-3"><div class="muted">Konečná cena</div><div class="fw-bold">' + czk.format(Math.round(s.d.finalPrice)) + '</div></div>' +
          '<div class="mt-2"><div class="muted">Vyplaceno celkem</div><div class="fw-bold">' + czk.format(Math.round(s.d.dividends)) + '</div></div>' +
          '<div class="divider my-2"></div>' +
          '<div class="muted">Hodnota portfolia</div>' +
          '<div class="fs-5 fw-bold">' + czk.format(Math.round(s.d.valueEnd)) + '</div>' +
          '<div class="muted mt-1">P/L</div>' +
          '<div class="fw-bold">' + czk.format(Math.round(s.d.pl)) + '</div>' +
        '</div>';
      simRow.appendChild(col);
    });

    updateBuyBox();
  }

  const calcBtn = document.getElementById('calc');
  if(calcBtn) calcBtn.addEventListener('click', renderSimulator);
  const horizonEl = document.getElementById('horizon');
  const invEl = document.getElementById('invAmount');
  if(horizonEl) horizonEl.addEventListener('change', renderSimulator);
  if(invEl) invEl.addEventListener('input', renderSimulator);
  renderSimulator();

  function renderAnnouncementsInit(){ renderAnnouncements(); }
  renderAnnouncementsInit();

  const toTop = document.getElementById('toTop');
  if(toTop){ toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' })); }
});

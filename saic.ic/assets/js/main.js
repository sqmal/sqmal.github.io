document.addEventListener('DOMContentLoaded', () => {
  const fmt = new Intl.NumberFormat('cs-CZ');
  const czk = new Intl.NumberFormat('cs-CZ', { style:'currency', currency:'CZK', maximumFractionDigits:0 });

  const KPIS = {
    cash:219000,
    debt:0,
    own:9562
  };

  const portfolio = [
    { name:'Tactical Transport Logistics a.s.', count:2500, share:25.00, eco:true },
    { name:'Premium Cars', count:2498, share:24.98, eco:true },
    { name:'Sprunk', count:136, share:1.36, eco:false },
    { name:'Nice Buns', count:128, share:1.28, eco:false },
    { name:'Piece of Peace', count:126, share:1.26, eco:false },
    { name:'Redwood Cigarettes', count:33, share:0.33, eco:false },
    { name:'Canny Bus Group', count:25, share:0.25, eco:false },
    { name:'SanGas', count:5, share:0.05, eco:false },
    { name:"Pay 'n' Spray", count:5, share:0.05, eco:false }
  ];

  const announcements = [
    { datetime:'2025-10-21T02:02:00', label:'Záměr nákupu', company:"Pay 'n' Spray", counterparty:'Sphere Corporation', qty:5, unitPrice:399000, change:'new' },
    { datetime:'2025-11-23T04:40:00', label:'Záměr nákupu', company:'SanGas', counterparty:'SanGas', qty:5, unitPrice:280000, change:'new' }
  ];

  const colors = [
    '#a78bfa',
    '#22c55e',
    '#facc15',
    '#fb7185',
    '#2dd4bf',
    '#60a5fa',
    '#f97316',
    '#c084fc',
    '#94a3b8'
  ];

  function setText(id, text){
    const el = document.getElementById(id);
    if(el) el.textContent = text;
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

  function setKpis(){
    setText('kpiCash', czk.format(KPIS.cash));
    setText('kpiDebt', czk.format(KPIS.debt));
    setText('kpiOwn', fmt.format(KPIS.own) + ' ks');
    setText('freeCash', czk.format(KPIS.cash));
  }

  const changeMap = {};
  announcements.forEach(item => {
    changeMap[item.company] = item.change;
  });

  const grid = document.getElementById('portfolioGrid');
  const emptyState = document.getElementById('emptyState');
  const searchEl = document.getElementById('search');
  const sortEl = document.getElementById('sort');
  const onlyEco = document.getElementById('onlyEco');
  const onlyNew = document.getElementById('onlyNew');
  const resetFilters = document.getElementById('resetFilters');
  const portfolioCount = document.getElementById('portfolioCount');

  function ecoBadge(item){
    if(!item.eco) return '';
    return '<span class="badge-eco"><i class="fa-solid fa-leaf me-1"></i>ECO</span>';
  }

  function changeBadge(item){
    if(!changeMap[item.name]) return '';
    return '<span class="badge-change"><i class="fa-solid fa-sparkles me-1"></i>Nové</span>';
  }

  function renderPortfolio(items){
    if(!grid) return;

    grid.innerHTML = '';

    if(portfolioCount){
      portfolioCount.textContent = items.length === 1 ? '1 firma' : `${items.length} firem`;
    }

    if(!items.length){
      emptyState?.classList.remove('d-none');
      return;
    }

    emptyState?.classList.add('d-none');

    const html = items.map(item => `
      <div class="portfolio-row">
        <div class="portfolio-name">
          <h3>${escapeHtml(item.name)}</h3>
          <div class="badges-row">
            ${ecoBadge(item)}
            ${changeBadge(item)}
          </div>
        </div>

        <div class="portfolio-cell">
          <span>Akcie</span>
          <strong>${fmt.format(item.count)} ks</strong>
        </div>

        <div class="portfolio-cell">
          <span>Podíl</span>
          <strong>${item.share.toFixed(2)} %</strong>
        </div>

        <div class="portfolio-cell">
          <span>V portfoliu</span>
          <strong class="share-pill">${item.share.toFixed(2)} %</strong>
        </div>
      </div>
    `).join('');

    grid.innerHTML = html;
  }

  function applyFilters(){
    const query = (searchEl?.value || '').toLowerCase().trim();
    const sortBy = sortEl?.value || 'share';

    let items = portfolio.filter(item => {
      const okQuery = !query || item.name.toLowerCase().includes(query);
      const okEco = !onlyEco?.checked || item.eco;
      const okNew = !onlyNew?.checked || changeMap[item.name];
      return okQuery && okEco && okNew;
    });

    if(sortBy === 'name') items.sort((a,b) => a.name.localeCompare(b.name, 'cs'));
    if(sortBy === 'share') items.sort((a,b) => b.share - a.share);
    if(sortBy === 'count') items.sort((a,b) => b.count - a.count);

    renderPortfolio(items);
  }

  function polarToCartesian(cx, cy, r, angle){
    const rad = (angle - 90) * Math.PI / 180;
    return {
      x:cx + r * Math.cos(rad),
      y:cy + r * Math.sin(rad)
    };
  }

  function describeArc(cx, cy, r, startAngle, endAngle){
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return [
      'M', cx, cy,
      'L', start.x, start.y,
      'A', r, r, 0, largeArcFlag, 0, end.x, end.y,
      'Z'
    ].join(' ');
  }

  function renderOwnershipPie(){
    const host = document.getElementById('ownershipPie');
    const legend = document.getElementById('pieLegend');
    if(!host || !legend) return;

    const owned = portfolio.reduce((sum, item) => sum + item.share, 0);
    const totalForPie = portfolio.reduce((sum, item) => sum + item.share, 0);
    const largest = portfolio.reduce((best, item) => item.share > (best?.share || 0) ? item : best, null);

    let angle = 0;

    const paths = portfolio.map((item, index) => {
      const part = totalForPie ? item.share / totalForPie : 0;
      const start = angle;
      const end = angle + part * 360;
      angle = end;
      return `<path d="${describeArc(50,50,48,start,end)}" fill="${colors[index % colors.length]}"></path>`;
    }).join('');

    host.innerHTML = `
      <svg viewBox="0 0 100 100" role="img" aria-label="Koláč vlastnictví SAIC">
        ${paths}
      </svg>
    `;

    legend.innerHTML = portfolio.map((item, index) => `
      <div class="legend-item">
        <span class="legend-dot" style="background:${colors[index % colors.length]}"></span>
        <span class="legend-name">${escapeHtml(item.name)}</span>
        <span class="legend-value">${item.share.toFixed(2)} %</span>
      </div>
    `).join('');

    setText('ownedTotal', owned.toFixed(2) + ' %');
    setText('pieTotal', owned.toFixed(2) + ' %');
    setText('largestHolding', largest ? largest.name : '—');
  }

  function renderAnnouncements(){
    const host = document.getElementById('timeline');
    if(!host) return;

    if(!announcements.length){
      host.textContent = 'Momentálně nejsou zveřejněna žádná oznámení.';
      return;
    }

    host.innerHTML = announcements.map(item => {
      const total = item.qty * item.unitPrice;
      const date = new Date(item.datetime).toLocaleString('cs-CZ', {
        day:'2-digit',
        month:'2-digit',
        year:'numeric',
        hour:'2-digit',
        minute:'2-digit'
      });

      return `
        <div class="timeline-item">
          <div class="timeline-top">
            <strong>${escapeHtml(item.label)}</strong>
            <span class="timeline-date">${escapeHtml(date)}</span>
          </div>
          <div>${escapeHtml(item.company)} · <strong>${fmt.format(item.qty)} ks</strong></div>
          <div class="timeline-meta">Proti-strana: ${escapeHtml(item.counterparty)} · Cena za kus: <strong>${czk.format(item.unitPrice)}</strong> · Objem: <strong>${czk.format(total)}</strong></div>
        </div>
      `;
    }).join('');
  }

  if(searchEl) searchEl.addEventListener('input', applyFilters);
  if(sortEl) sortEl.addEventListener('change', applyFilters);
  if(onlyEco) onlyEco.addEventListener('change', applyFilters);
  if(onlyNew) onlyNew.addEventListener('change', applyFilters);

  if(resetFilters){
    resetFilters.addEventListener('click', () => {
      if(searchEl) searchEl.value = '';
      if(sortEl) sortEl.value = 'share';
      if(onlyEco) onlyEco.checked = false;
      if(onlyNew) onlyNew.checked = false;
      applyFilters();
    });
  }

  const toTop = document.getElementById('toTop');
  if(toTop){
    toTop.addEventListener('click', () => {
      window.scrollTo({ top:0, behavior:'auto' });
    });
  }

  setKpis();
  renderOwnershipPie();
  applyFilters();
  renderAnnouncements();
});
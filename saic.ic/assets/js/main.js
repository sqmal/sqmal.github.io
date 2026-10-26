// ===== Data =====
const KPIS = { cash: 2400000, debt: 0, own: 7861 };

const portfolio = [
  { name: "Tactical Transport Logistics a.s.", count: 2500, share: 25.0, eco: true },
  { name: "Premium Cars", count: 2498, share: 24.98, eco: true },
  { name: "Nice Buns", count: 120, share: 1.2, eco: false },
  { name: "Sprunk", count: 104, share: 1.04, eco: false },
  { name: "Piece of Peace", count: 91, share: 0.91, eco: false },
  { name: "Calton Escapade", count: 75, share: 0.75, eco: false },
  { name: "Ammu-Nation", count: 31, share: 0.31, eco: false },
  { name: "Redwood Cigarettes", count: 27, share: 0.27, eco: false },
  { name: "Canny Bus Group", count: 25, share: 0.25, eco: false },
  { name: "Pay 'n' Spray", count: 15, share: 0.15, eco: false },
  { name: "SanGas", count: 6, share: 0.06, eco: false },
  { name: "West Andreas Invest", count: 5, share: 0.05, eco: false },
];

const announcements = [
  { datetime: "2025-11-23T04:40:00", label: "Záměr nákupu", company: "SanGas", counterparty: "SanGas", qty: 5, unitPrice: 280000 },
  { datetime: "2025-10-21T02:02:00", label: "Záměr nákupu", company: "Pay 'n' Spray", counterparty: "Sphere Corporation", qty: 5, unitPrice: 399000 },
];

const faq = [
  ["Co je SAIC?", "San Andreas Investment Centre je investiční společnost. Peníze akcionářů neinvestuje do jedné firmy, ale skupuje podíly ve více společnostech. Kdo vlastní akcii SAIC, vlastní tak nepřímo kousek celého portfolia."],
  ["Jak se stanu akcionářem?", "Akcie SAIC koupíte přímo od společnosti nebo od jiného akcionáře. Pro nákup kontaktujte vedení SAIC – domluví s vámi počet akcií a cenu."],
  ["Proč kupovat SAIC a ne přímo akcie firem?", "Jedna akcie SAIC rozkládá riziko mezi dvanáct firem. Navíc u některých společností má SAIC exkluzivní právo prodeje, takže se do nich jinak investovat nedá."],
  ["Jak se počítá hodnota akcie?", "Hodnota SAIC vychází z hodnoty podílů ve firmách, volných prostředků a případných dluhů. Když se firmám v portfoliu daří, roste i hodnota SAIC."],
  ["Vyplácí SAIC dividendy?", "Výplata dividend se řídí §12–§14.1 novely č. 252/2025."],
  ["Kde uvidím, co SAIC kupuje?", "Každý větší nákup najdete v sekci Oznámení. Obchody nad 1 mil. Kč zveřejňujeme nejpozději do 3 dnů, obchody nad 5 mil. Kč hodinu předem."],
  ["Je investice do SAIC riziková?", "Ano, jako každá investice. Hodnota akcií může klesnout i stoupnout podle toho, jak se daří firmám v portfoliu. Investujte jen peníze, které si můžete dovolit."],
];

// ===== Helpers =====
const fmt = new Intl.NumberFormat("cs-CZ");
const czk = new Intl.NumberFormat("cs-CZ", { style: "currency", currency: "CZK", maximumFractionDigits: 0 });
const colors = ["var(--c1)", "var(--c2)", "var(--c3)", "var(--c4)", "var(--c5)"];
const newSet = new Set(announcements.map((a) => a.company));
const $ = (s) => document.querySelector(s);
const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// ===== Mobile menu =====
const burger = $("#burger");
const mobileNav = $("#mobileNav");
burger.addEventListener("click", () => {
  const open = mobileNav.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
  burger.textContent = open ? "✕" : "☰";
});
mobileNav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    burger.textContent = "☰";
  })
);

// ===== Hero window =====
$("#windowList").innerHTML = portfolio.slice(0, 6).map((p, i) => `
  <li>
    <span class="avatar" style="background:${colors[i % 5]}"></span>
    <span class="wl-text"><span class="wl-name">${esc(p.name)}</span><span class="wl-sub">${fmt.format(p.count)} akcií</span></span>
    <span class="wl-pct">${p.share.toFixed(2)}%</span>
  </li>`).join("");

$("#kpis").innerHTML = [
  ["Volné prostředky", czk.format(KPIS.cash)],
  ["Vlastní akcie", `${fmt.format(KPIS.own)} ks (78,61 %)`],
  ["Dluh vůči státu", czk.format(KPIS.debt)],
  ["Firem v portfoliu", String(portfolio.length)],
].map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");

// ===== Donut + legend =====
(function donut() {
  const r = 70, c = 2 * Math.PI * r;
  const top = portfolio.slice(0, 4);
  const rest = portfolio.slice(4).reduce((s, p) => s + p.share, 0);
  const segs = [...top.map((p) => p.share), rest];
  let off = 0;
  let svg = `<circle cx="90" cy="90" r="${r}" fill="none" stroke="var(--soft)" stroke-width="18"/>`;
  segs.forEach((v, i) => {
    const len = (v / 100) * c;
    svg += `<circle cx="90" cy="90" r="${r}" fill="none" stroke="${colors[i]}" stroke-width="18" stroke-dasharray="${len} ${c - len}" stroke-dashoffset="${-off}"/>`;
    off += len;
  });
  $("#donut").innerHTML = svg;
  $("#total").textContent = portfolio.reduce((s, p) => s + p.share, 0).toFixed(2) + " %";
  const legend = [...top, { name: `Ostatní (${portfolio.length - 4} firem)`, share: rest }];
  $("#legend").innerHTML = legend.map((p, i) => `
    <li><span class="sw" style="background:${colors[i]}"></span><span class="nm">${esc(p.name)}</span><span class="num muted">${p.share.toFixed(2)} %</span></li>`).join("");
})();

// ===== Portfolio table =====
const state = { q: "", sort: "share", eco: false, new: false };
const maxShare = Math.max(...portfolio.map((p) => p.share));

function renderTable() {
  let list = portfolio.filter((p) =>
    (!state.q || p.name.toLowerCase().includes(state.q.toLowerCase())) &&
    (!state.eco || p.eco) &&
    (!state.new || newSet.has(p.name)));
  if (state.sort === "name") list.sort((a, b) => a.name.localeCompare(b.name, "cs"));
  if (state.sort === "share") list.sort((a, b) => b.share - a.share);
  if (state.sort === "count") list.sort((a, b) => b.count - a.count);

  $("#rows").innerHTML = list.map((p) => `
    <tr>
      <td><span class="co">${esc(p.name)}</span>${p.eco ? '<span class="tag eco">Eco</span>' : ""}${newSet.has(p.name) ? '<span class="tag new">Nové</span>' : ""}</td>
      <td class="r num">${fmt.format(p.count)}</td>
      <td><div class="bar-cell"><div class="bar"><span style="width:${(p.share / maxShare) * 100}%"></span></div><span class="pct num">${p.share.toFixed(2)} %</span></div></td>
    </tr>`).join("");
  $("#empty").hidden = list.length > 0;
}
$("#search").addEventListener("input", (e) => { state.q = e.target.value; renderTable(); });
const dd = $("#sort");
const ddBtn = dd.querySelector(".dd-btn");
const setOpen = (o) => { dd.classList.toggle("open", o); ddBtn.setAttribute("aria-expanded", o); };
ddBtn.addEventListener("click", (e) => { e.stopPropagation(); setOpen(!dd.classList.contains("open")); });
dd.querySelectorAll("li").forEach((li) =>
  li.addEventListener("click", () => {
    dd.querySelectorAll("li").forEach((x) => x.removeAttribute("aria-selected"));
    li.setAttribute("aria-selected", "true");
    dd.querySelector(".dd-label").textContent = li.textContent;
    state.sort = li.dataset.value;
    setOpen(false);
    renderTable();
  })
);
document.addEventListener("click", () => setOpen(false));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
document.querySelectorAll(".chip").forEach((b) =>
  b.addEventListener("click", () => {
    const k = b.dataset.filter;
    state[k] = !state[k];
    b.classList.toggle("on", state[k]);
    renderTable();
  })
);
renderTable();

// ===== Announcements =====
$("#ann-list").innerHTML = announcements.map((a) => {
  const d = new Date(a.datetime);
  return `
    <li>
      <div class="date">${d.toLocaleDateString("cs-CZ")}<br>${d.toLocaleTimeString("cs-CZ", { hour: "2-digit", minute: "2-digit" })}</div>
      <div>
        <div class="eyebrow">${esc(a.label)}</div>
        <div class="company">${esc(a.company)}</div>
        <p class="meta">${a.qty} ks od ${esc(a.counterparty)} · <span class="num">${czk.format(a.unitPrice)}</span> / ks · celkem <strong>${czk.format(a.qty * a.unitPrice)}</strong></p>
      </div>
    </li>`;
}).join("");

// ===== FAQ accordion =====
$("#faq-list").innerHTML = faq.map(([q, a], i) => `
  <div class="faq-item">
    <button class="faq-q" aria-expanded="false" aria-controls="faq-a-${i}">${esc(q)}<span class="faq-icon">+</span></button>
    <div class="faq-a" id="faq-a-${i}" role="region"><div><p>${esc(a)}</p></div></div>
  </div>`).join("");

document.querySelectorAll(".faq-item").forEach((item) => {
  const btn = item.querySelector(".faq-q");
  btn.addEventListener("click", () => {
    const open = !item.classList.contains("open");
    document.querySelectorAll(".faq-item.open").forEach((o) => {
      o.classList.remove("open");
      o.querySelector(".faq-q").setAttribute("aria-expanded", "false");
    });
    if (open) {
      item.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
    }
  });
});
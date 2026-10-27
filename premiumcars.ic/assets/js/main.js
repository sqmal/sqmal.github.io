const cars = [
  {
    id: "30701",
    name: "2010 Audi R8 5.2 V10",
    image: "images/30701.png",
    wrap: true,
    tuning: true,
    parts:
      "Odlehčená karosérie, Žádný omedzovač, Motor s turbem, Závodní šestibodové pásy, Úprava ECU - výkon, Bezp. polo-rám (chrom-molybden)",
    speed: "345 kmph",
    note: "",
    price: "100.000 Kč",
    available: true,
    originalImage: "https://i.imgur.com/1Rwh3xp.png",
  },
  {
    id: "25486",
    name: "2010 Audi R8 5.2 V10",
    image: "images/25486.png",
    wrap: false,
    tuning: true,
    parts:
      "Odlehčená karosérie, Žádný omedzovač, Motor s turbem, Sportovní čtyřbodové pásy, Silnější brzdy, Zvýšený zámek otáčení +8, Seřízení geometrie T2, Úprava ECU - výkon",
    speed: "345 kmph",
    note: "",
    price: "100.000 Kč",
    available: true,
    originalImage: "https://i.imgur.com/WDREAwc.png",
  },
  {
    id: "14843",
    name: "2007 Mercedes-Benz S500",
    image: "images/14843.png",
    wrap: false,
    tuning: true,
    parts:
      "Odlehčená karosérie, Žádný omedzovač, Motor s turbem, Závodní šestibodové pásy, Zvýšený zámek otáčení +8, Silnější brzdy, Úprava ECU - výkon, Seřízení geometrie T1, Základní bezp. polo-rám (ocel)",
    speed: "279 kmph",
    note: "",
    price: "60.000 Kč",
    available: true,
    originalImage: "https://i.imgur.com/8HnybjC.png",
  },
  {
    id: "14273",
    name: "2015 Mercedes-Benz SL500",
    image: "images/14273.png",
    wrap: false,
    tuning: true,
    parts:
      "Žádný omedzovač, Motor s turbem, Závodní šestibodové pásy, Silnější brzdy, Seřízení geometrie T2, Úprava ECU - výkon, Základní bezp. polo-rám (ocel)",
    speed: "264 kmph",
    note: "",
    price: "50.000 Kč",
    available: true,
    originalImage: "https://i.imgur.com/syHlXIa.png",
  },
  {
    id: "16643",
    name: "2010 Porsche Cayman S",
    image: "images/16643.png",
    wrap: false,
    tuning: true,
    parts:
      "Žádný omedzovač, Motor s turbem, Závodní šestibodové pásy, Silnější brzdy, Seřízení geometrie T2, Úprava ECU - výkon, Základní bezp. polo-rám (ocel)",
    speed: "300 kmph",
    note: "",
    price: "60.000 Kč",
    available: true,
    originalImage: "https://i.imgur.com/qC00yYr.png",
  },
  {
    id: "15094",
    name: "2016 Range Rover Evoque",
    image: "images/15094.png",
    wrap: false,
    tuning: true,
    parts:
      "Žádný omedzovač, Motor s turbem, Závodní šestibodové pásy, Silnější brzdy, Seřízení geometrie T2, Úprava ECU - výkon, Základní bezp. polo-rám (ocel)",
    speed: "243 kmph",
    note: "",
    price: "20.000 Kč",
    available: true,
    originalImage: "https://i.imgur.com/SrM3mQ3.png",
  },
  {
    id: "13062",
    name: "2019 Alfa Romeo Giulia Quadrifoglio",
    image: "images/13062.png",
    wrap: false,
    tuning: true,
    parts:
      "Odlehčená karosérie, Běžná pneu, Běžná pneu, Úprava ECU - výkon, Žádný omedzovač, Motor s turbem, Zvýšený zámek otáčení +8, Silnější brzdy, Závodní šestibodové pásy, Seřízení geometrie T2, Zatížená zadní část",
    speed: "264 kmph",
    note: "",
    price: "40.000 Kč",
    available: true,
    originalImage: "https://i.imgur.com/moJfmrY.png",
  },
  {
    id: "5168",
    name: "2018 Dodge Charger 5.7 V8",
    image: "images/5168.png",
    wrap: true,
    tuning: true,
    parts:
      "Odlehčená karosérie, Velmi široká pneu, Velmi široká pneu, Úprava ECU - výkon, Žádný omedzovač, Motor s turbem, Zvýšený zámek otáčení +8, Závodní šestibodové pásy, Samosvorný diferenciál 1-WAY, Silnější brzdy, Seřízení geometrie T2, Základní bezp. polo-rám (ocel)",
    speed: "262 kmph",
    note: "",
    price: "20.000 Kč",
    available: false,
    originalImage: "https://i.imgur.com/38cSWxW.png",
  },
  {
    id: "18150",
    name: "1966 Ford Mustang GT 4.7 V8",
    image: "images/18150.png",
    wrap: false,
    tuning: true,
    parts:
      "Žádný omedzovač, Motor s turbem, Závodní šestibodové pásy, Silnější brzdy, Seřízení geometrie T2, Úprava ECU - výkon, Základní bezp. polo-rám (ocel)",
    speed: "217 kmph",
    note: "",
    price: "10.000 Kč",
    available: true,
    originalImage: "https://i.imgur.com/qprhiSa.png",
  },
  {
    id: "33462",
    name: "1996 Mercedes-Benz SL500",
    image: "images/33462.png",
    wrap: false,
    tuning: false,
    parts: "",
    speed: " kmph",
    note: "",
    price: "10.000 Kč",
    available: true,
    originalImage: "https://i.imgur.com/qprhiSa.png",
  },
  {
    id: "29646",
    name: "2005 Motokára 250ccm",
    image: "images/29646.png",
    wrap: false,
    tuning: false,
    parts: "",
    speed: "92 kmph",
    note: "",
    price: "1.000 Kč",
    available: true,
    originalImage: "https://i.imgur.com/hIwEw6a.png",
  },
];


const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const num = (s) => Number(String(s).replace(/[^0-9]/g, ""));
const money = (n) => new Intl.NumberFormat("cs-CZ").format(Math.round(n)) + " Kč";
const year = (c) => Number(c.name.slice(0, 4));
const model = (c) => c.name.replace(/^\d{4}\s/, "");
const isEco = (c) => c.eco ?? year(c) >= 2015;
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const ICON = {
  chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 6 9 17l-5-5"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>',
  cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="4" width="18" height="18" rx="3"/><path d="M8 2v4M16 2v4M3 10h18"/></svg>',
  left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>',
  right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>',
};

const MONTHS = ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"];
const MONTHS_G = ["ledna", "února", "března", "dubna", "května", "června", "července", "srpna", "září", "října", "listopadu", "prosince"];
const WEEK = ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"];

const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const parse = (s) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const today = (offset = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return iso(d);
};
const human = (s) => {
  const d = parse(s);
  return `${d.getDate()}. ${MONTHS_G[d.getMonth()]} ${d.getFullYear()}`;
};

const closeAll = (except) => $$(".open").forEach((el) => el !== except && !el.matches(".nav-links") && el.classList.remove("open"));
document.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown, .date")) closeAll();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeAll();
});

const OPTIONS = {
  sort: [
    ["default", "Doporučené"],
    ["priceAsc", "Nejlevnější"],
    ["priceDesc", "Nejdražší"],
    ["speedDesc", "Nejrychlejší"],
    ["yearDesc", "Nejnovější"],
  ],
  price: [
    ["all", "Všechny ceny"],
    ["20000", "Do 20 000 Kč"],
    ["50000", "Do 50 000 Kč"],
    ["100000", "Do 100 000 Kč"],
  ],
};

const compare = [];
const state = { q: "", sort: "default", price: "all", available: false, eco: false };

function setupDropdown(el) {
  const name = el.dataset.name;
  const btn = $(".dd-btn", el);
  const menu = $(".dd-menu", el);
  const draw = () => {
    const list = OPTIONS[name];
    const current = list.find(([v]) => v === state[name]);
    btn.innerHTML = `<span>${current[1]}</span>${ICON.chev}`;
    btn.classList.toggle("on", state[name] !== list[0][0]);
    menu.innerHTML = list
      .map(([v, t]) => `<button type="button" class="dd-item ${v === state[name] ? "sel" : ""}" data-v="${v}"><span>${t}</span>${ICON.check}</button>`)
      .join("");
  };
  btn.onclick = () => {
    closeAll(el);
    el.classList.toggle("open");
  };
  menu.onclick = (e) => {
    const item = e.target.closest("[data-v]");
    if (!item) return;
    state[name] = item.dataset.v;
    el.classList.remove("open");
    draw();
    render();
  };
  el.redraw = draw;
  draw();
}

const dropdowns = $$(".dropdown");
dropdowns.forEach(setupDropdown);

$(".search input").addEventListener("input", (e) => {
  state.q = e.target.value.trim().toLowerCase();
  render();
});

$$(".chip").forEach((chip) => {
  chip.onclick = () => {
    const key = chip.dataset.filter;
    state[key] = !state[key];
    chip.classList.toggle("on", state[key]);
    render();
  };
});

$("[data-reset]").onclick = () => {
  Object.assign(state, { q: "", sort: "default", price: "all", available: false, eco: false });
  $(".search input").value = "";
  $$(".chip").forEach((c) => c.classList.remove("on"));
  dropdowns.forEach((d) => d.redraw());
  render();
};

function filtered() {
  let list = cars.filter(
    (c) =>
      (!state.q || c.name.toLowerCase().includes(state.q)) &&
      (state.price === "all" || num(c.price) <= Number(state.price)) &&
      (!state.available || c.available) &&
      (!state.eco || isEco(c)),
  );
  const by = {
    priceAsc: (a, b) => num(a.price) - num(b.price),
    priceDesc: (a, b) => num(b.price) - num(a.price),
    speedDesc: (a, b) => num(b.speed) - num(a.speed),
    yearDesc: (a, b) => year(b) - year(a),
  }[state.sort];
  if (by) list = [...list].sort(by);
  return list;
}

const photo = (c) =>
  `<img src="${esc(c.image)}" alt="${esc(c.name)}" loading="lazy" onerror="this.onerror=null;this.src='${esc(c.originalImage)}'">`;

const tags = (c) =>
  [c.tuning && "<span>Úpravy</span>", c.wrap && "<span>Polep</span>", isEco(c) && '<span class="eco">Eco</span>'].filter(Boolean).join("");

function render() {
  const list = filtered();
  $(".count").textContent = `${list.length} z ${cars.length} vozů`;
  $(".empty").hidden = list.length > 0;
  $(".grid").innerHTML = list
    .map(
      (c) => `<article class="card" data-car="${esc(c.id)}" tabindex="0" aria-label="${esc(model(c))}">
  <div class="card-photo">${photo(c)}<span class="badge ${c.available ? "" : "off"}">${c.available ? "K dispozici" : "Nedostupné"}</span></div>
  <div class="card-body">
    <span class="card-meta">Rok ${year(c)} · VIN ${esc(c.id)}</span>
    <h3>${esc(model(c))}</h3>
    <div class="tags">${tags(c)}</div>
    <div class="card-foot"><span class="price">${money(num(c.price))} <small>/ den</small></span><span class="speed">${num(c.speed)} km/h</span></div>
    <div class="card-actions"><span class="card-view">Prohlédnout vůz <span>↗</span></span><button type="button" class="cmp-btn ${compare.includes(c.id) ? "on" : ""}" data-cmp="${esc(c.id)}">${compare.includes(c.id) ? "✓ V porovnání" : "+ Porovnat"}</button></div>
  </div>
</article>`,
    )
    .join("");
  $$(".grid [data-car]").forEach((b) => {
    b.onclick = () => openCar(cars.find((c) => c.id === b.dataset.car));
    b.onkeydown = (e) => {
      if (e.key === "Enter") b.click();
    };
  });
  $$("[data-cmp]").forEach((b) => {
    b.onclick = (e) => {
      e.stopPropagation();
      toggleCompare(b.dataset.cmp);
    };
  });
  drawCompareBar();
}

const navLinks = $("#nav-links");
const menuBtn = $(".menu-btn");
const toggleMenu = (open) => {
  navLinks.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
};
menuBtn.onclick = () => toggleMenu(!navLinks.classList.contains("open"));
$$("a", navLinks).forEach((a) => (a.onclick = () => toggleMenu(false)));

const carDialog = $("#car-dialog");
const termsDialog = $("#terms-dialog");

function openDialog(d) {
  d.showModal();
  document.body.classList.add("lock");
}

$$("dialog").forEach((d) => {
  $(".modal-close", d).onclick = () => d.close();
  d.addEventListener("click", (e) => {
    if (e.target === d) d.close();
  });
  d.addEventListener("close", () => {
    if (!$$("dialog[open]").length) document.body.classList.remove("lock");
  });
});
$$("[data-open-terms]").forEach((b) => (b.onclick = () => openDialog(termsDialog)));

function setupDate(wrap) {
  const input = $("input", wrap);
  const btn = $(".date-btn", wrap);
  const cal = $(".cal", wrap);
  let view = parse(input.value);
  const label = () => (btn.innerHTML = `${ICON.cal}<span>${human(input.value)}</span>`);
  const draw = () => {
    const first = new Date(view.getFullYear(), view.getMonth(), 1);
    const offset = (first.getDay() + 6) % 7;
    const days = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    const min = input.min;
    const now = today();
    let cells = "<span></span>".repeat(offset);
    for (let d = 1; d <= days; d++) {
      const v = iso(new Date(view.getFullYear(), view.getMonth(), d));
      const cls = ["day", v === input.value && "sel", v === now && "today"].filter(Boolean).join(" ");
      cells += `<button type="button" class="${cls}" data-v="${v}" ${v < min ? "disabled" : ""}>${d}</button>`;
    }
    cal.innerHTML = `<div class="cal-head"><button type="button" class="cal-nav" data-m="-1" aria-label="Předchozí měsíc">${ICON.left}</button><strong>${MONTHS[view.getMonth()]} ${view.getFullYear()}</strong><button type="button" class="cal-nav" data-m="1" aria-label="Další měsíc">${ICON.right}</button></div><div class="cal-grid">${WEEK.map((w) => `<em>${w}</em>`).join("")}${cells}</div>`;
  };
  btn.onclick = () => {
    closeAll(wrap);
    view = parse(input.value);
    draw();
    wrap.classList.toggle("open");
  };
  cal.onclick = (e) => {
    e.stopPropagation();
    const nav = e.target.closest("[data-m]");
    if (nav) {
      view = new Date(view.getFullYear(), view.getMonth() + Number(nav.dataset.m), 1);
      return draw();
    }
    const day = e.target.closest("[data-v]");
    if (!day || day.disabled) return;
    input.value = day.dataset.v;
    wrap.classList.remove("open");
    input.dispatchEvent(new Event("input", { bubbles: true }));
  };
  wrap.refresh = label;
  label();
}

const dateField = (name, label, value) =>
  `<div class="field"><span>${label}</span><div class="date"><input type="hidden" name="${name}" value="${value}" min="${today()}"><button type="button" class="date-btn"></button><div class="cal"></div></div></div>`;

function openCar(c) {
  if (!c) return;
  const parts = c.parts ? c.parts.split(",").map((p) => p.trim()).filter((p, i, a) => p && a.indexOf(p) === i) : [];
  $("#car-content").innerHTML = `
<p class="card-meta">${year(c)} · VIN ${esc(c.id)}</p>
<h2 class="modal-title">${esc(model(c))}</h2>
<div class="detail">
  <div>
    <div class="detail-photo">${photo(c)}</div>
    <div class="detail-row"><span class="price">${money(num(c.price))} <small>/ den</small></span><span class="speed">${num(c.speed)} km/h</span></div>
    <div class="tags">${tags(c)}</div>
    ${parts.length ? `<div class="parts"><h4>Výbava a úpravy</h4><ul>${parts.map((p) => `<li>${esc(p)}</li>`).join("")}</ul></div>` : ""}
  </div>
  <form class="booking" novalidate>
    <h3>${c.available ? "Váš termín" : "Momentálně nedostupné"}</h3>
    <fieldset ${c.available ? "" : "disabled"}>
      <div class="fields">
        ${dateField("od", "Převzetí", today())}
        ${dateField("do", "Vrácení", today(3))}
        <label class="field field-full"><span>Jméno a příjmení</span><input name="jmeno" autocomplete="name" placeholder="Jan Novák" required></label>
        <label class="field"><span>Telefon</span><input name="telefon" inputmode="numeric" maxlength="6" placeholder="706008" required></label>
        <label class="field"><span>Email</span><input name="email" type="email" autocomplete="email" placeholder="jmeno@post.ic" required></label>
      </div>
      <div class="quote">
        <div><span>Cena za den</span><strong>${money(num(c.price))}</strong></div>
        <div><span>Délka pronájmu</span><strong data-q="days"></strong></div>
        <div><span>Sleva</span><strong data-q="discount"></strong></div>
        <div class="total"><span>Celkem</span><strong data-q="total"></strong></div>
      </div>
      <label class="consent"><input type="checkbox" name="consent"><span>Souhlasím s <a href="#" data-terms>podmínkami pronájmu</a>.</span></label>
      <button class="btn btn-dark" type="submit">${c.available ? "Pokračovat" : "Nedostupné"} ${ICON.arrow}</button>
    </fieldset>
    <p class="status" role="status"></p>
  </form>
</div>`;

  const f = $(".booking", carDialog);
  const dates = $$(".date", f);
  dates.forEach(setupDate);
  const status = $(".status", f);
  const submit = $("button[type=submit]", f);
  let quote;
  let confirmed = false;

  const recalc = () => {
    const a = f.elements.od;
    const b = f.elements.do;
    if (b.value <= a.value) {
      const next = parse(a.value);
      next.setDate(next.getDate() + 1);
      b.value = iso(next);
    }
    b.min = a.value;
    dates.forEach((d) => d.refresh());
    const days = Math.max(1, Math.round((parse(b.value) - parse(a.value)) / 86400000));
    const discount = days >= 7 ? 20 : days >= 3 ? 10 : 0;
    const original = num(c.price) * days;
    quote = { days, discount, original, total: original * (1 - discount / 100) };
    $('[data-q="days"]', f).textContent = `${days} ${days === 1 ? "den" : days < 5 ? "dny" : "dní"}`;
    $('[data-q="discount"]', f).textContent = discount ? `−${discount} %` : "Bez slevy";
    $('[data-q="total"]', f).textContent = money(quote.total);
  };

  f.addEventListener("input", () => {
    confirmed = false;
    status.className = "status";
    status.textContent = "";
    submit.innerHTML = `Pokračovat ${ICON.arrow}`;
    recalc();
  });
  recalc();

  $("[data-terms]", f).onclick = (e) => {
    e.preventDefault();
    openDialog(termsDialog);
  };

  f.onsubmit = async (e) => {
    e.preventDefault();
    if (!c.available) return;
    const d = Object.fromEntries(new FormData(f).entries());
    status.className = "status";
    if (!d.jmeno?.trim()) return (status.textContent = "Vyplňte jméno a příjmení.");
    if (!/^\d{6}$/.test(d.telefon || "")) return (status.textContent = "Telefon musí mít 6 číslic.");
    if (!/^[^\s@]+@post\.ic$/.test((d.email || "").trim())) return (status.textContent = "Použijte email s koncovkou @post.ic.");
    if (d.od < today() || d.do <= d.od) return (status.textContent = "Zkontrolujte termín převzetí a vrácení.");
    if (!d.consent) return (status.textContent = "Potvrďte souhlas s podmínkami pronájmu.");

    if (!confirmed) {
      confirmed = true;
      status.className = "status info";
      status.textContent = `${human(d.od)} – ${human(d.do)} · celkem ${money(quote.total)}. Zkontrolujte údaje a odešlete.`;
      submit.innerHTML = `Odeslat rezervaci ${ICON.arrow}`;
      return;
    }

    submit.disabled = true;
    submit.textContent = "Odesílám…";
    const fields = [
      ["Jméno a příjmení", d.jmeno],
      ["Telefon", d.telefon],
      ["Email", d.email],
      ["Vozidlo", c.name],
      ["Datum převzetí", d.od],
      ["Datum vrácení", d.do],
      ["Počet dní", quote.days],
      ["Cena za den", money(num(c.price))],
      ["Sleva", quote.discount + " %"],
      ["Původní cena", money(quote.original)],
      ["Cena celkem", money(quote.total)],
    ].map(([name, value]) => ({ name, value: String(value), inline: true }));

    try {
      const r = await fetch("https://sqmal.eu/artic/premiumcars.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "Premium Cars",
          embeds: [
            {
              title: "Nová rezervace vozidla",
              thumbnail: { url: c.originalImage },
              fields,
              timestamp: new Date().toISOString(),
              footer: { text: "Premium Cars" },
            },
          ],
        }),
      });
      if (!r.ok) throw new Error();
      status.className = "status ok";
      status.textContent = "Hotovo! Žádost jsme přijali a brzy se vám ozveme.";
      $("fieldset", f).disabled = true;
      submit.textContent = "Rezervace odeslána";
    } catch {
      status.className = "status";
      status.textContent = "Odeslání se nezdařilo. Zkuste to znovu nebo napište na rezervace@premiumcars.ic.";
      submit.disabled = false;
      submit.innerHTML = `Zkusit znovu ${ICON.arrow}`;
    }
  };

  openDialog(carDialog);
}

const byId = (id) => cars.find((c) => c.id === id);

function toggleCompare(id) {
  const i = compare.indexOf(id);
  if (i >= 0) compare.splice(i, 1);
  else if (compare.length < 3) compare.push(id);
  else return alertBar();
  render();
}

function alertBar() {
  const bar = $(".compare-bar");
  bar.classList.remove("shake");
  void bar.offsetWidth;
  bar.classList.add("shake");
}

function drawCompareBar() {
  const bar = $(".compare-bar");
  bar.hidden = compare.length === 0;
  $(".compare-items").innerHTML =
    compare
      .map((id) => {
        const c = byId(id);
        return `<button class="cmp-item" data-remove="${esc(id)}" aria-label="Odebrat">${photo(c)}<span>${esc(model(c))}</span><em>×</em></button>`;
      })
      .join("") + `<span class="cmp-hint num">${compare.length}/3</span>`;
  $$("[data-remove]").forEach((b) => (b.onclick = () => toggleCompare(b.dataset.remove)));
  $("[data-compare-open]").disabled = compare.length < 2;
}

$("[data-compare-clear]").onclick = () => {
  compare.length = 0;
  render();
};

$("[data-compare-open]").onclick = () => {
  const list = compare.map(byId);
  const best = (fn, dir) => {
    const vals = list.map(fn);
    return dir === "max" ? Math.max(...vals) : Math.min(...vals);
  };
  const rows = [
    ["Cena / den", (c) => num(c.price), (v) => money(v), "min"],
    ["Max. rychlost", (c) => num(c.speed), (v) => v + " km/h", "max"],
    ["Rok výroby", (c) => year(c), (v) => v, "max"],
    ["Úprav ve výbavě", (c) => (c.parts ? new Set(c.parts.split(",").map((p) => p.trim())).size : 0), (v) => v, "max"],
    ["Dostupnost", (c) => (c.available ? 1 : 0), (v) => (v ? "K dispozici" : "Nedostupné"), "max"],
    ["Eco", (c) => (isEco(c) ? 1 : 0), (v) => (v ? "Ano" : "Ne"), "max"],
  ];
  $(".compare-table").innerHTML = `<div class="ct" style="--cols:${list.length}">
  <div class="ct-row ct-head"><span></span>${list
    .map((c) => `<div class="ct-car">${photo(c)}<strong>${esc(model(c))}</strong><button class="btn btn-dark" data-pick="${esc(c.id)}">Vybrat</button></div>`)
    .join("")}</div>
  ${rows
    .map(([label, fn, f, dir]) => {
      const b = best(fn, dir);
      return `<div class="ct-row"><span class="ct-label">${label}</span>${list
        .map((c) => `<span class="num ${fn(c) === b && list.some((x) => fn(x) !== b) ? "win" : ""}">${f(fn(c))}</span>`)
        .join("")}</div>`;
    })
    .join("")}
</div>`;
  $$("[data-pick]").forEach(
    (b) =>
      (b.onclick = () => {
        $("#compare-dialog").close();
        openCar(byId(b.dataset.pick));
      }),
  );
  openDialog($("#compare-dialog"));
};

const answers = {};
$$(".finder .q").forEach((q) => {
  $$(".chip", q).forEach((chip) => {
    chip.onclick = () => {
      $$(".chip", q).forEach((c) => c.classList.toggle("on", c === chip));
      answers[q.dataset.q] = chip.dataset.v;
      findCar();
    };
  });
});

function styleOf(c) {
  if (/Motokára/.test(c.name)) return "fun";
  if (year(c) < 2000) return "classic";
  if (/S500|Range Rover|Charger/.test(c.name)) return "comfort";
  return "sport";
}

function findCar() {
  const box = $(".finder-result");
  if (!answers.budget || !answers.style || !answers.priority) return;
  const budget = Number(answers.budget);
  const scored = cars
    .filter((c) => c.available)
    .map((c) => {
      let s = 0;
      if (num(c.price) <= budget) s += 40;
      else s -= (num(c.price) - budget) / 2000;
      if (styleOf(c) === answers.style) s += 35;
      if (answers.priority === "speed") s += num(c.speed) / 10;
      if (answers.priority === "price") s += 30 - num(c.price) / 4000;
      if (answers.priority === "eco") s += isEco(c) ? 30 : 0;
      return { c, s };
    })
    .sort((a, b) => b.s - a.s);
  const [top, ...rest] = scored;
  const c = top.c;
  box.hidden = false;
  box.innerHTML = `<div class="fr-main">
  <div class="fr-photo">${photo(c)}</div>
  <div class="fr-info">
    <span class="eyebrow">Doporučujeme</span>
    <h3>${esc(model(c))}</h3>
    <p class="card-meta">Rok ${year(c)} · ${num(c.speed)} km/h · ${money(num(c.price))} / den</p>
    <div class="fr-actions">
      <button class="btn btn-dark" data-fr="${esc(c.id)}">Zobrazit vůz</button>
      <button class="btn btn-light" data-fr-cmp>Porovnat s alternativami</button>
    </div>
  </div>
</div>
<p class="fr-alt">Alternativy: ${rest
    .slice(0, 2)
    .map((r) => `<button class="link" data-fr="${esc(r.c.id)}">${esc(model(r.c))}</button>`)
    .join(" · ")}</p>`;
  $$("[data-fr]", box).forEach((b) => (b.onclick = () => openCar(byId(b.dataset.fr))));
  $("[data-fr-cmp]", box).onclick = () => {
    compare.length = 0;
    compare.push(...scored.slice(0, 3).map((r) => r.c.id));
    render();
    $("[data-compare-open]").click();
  };
}

render();

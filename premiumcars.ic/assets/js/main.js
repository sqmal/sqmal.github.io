document.addEventListener("DOMContentLoaded", () => {
  fetch("data/cars.json")
    .then(res => res.json())
    .then(data => {
      window.carData = data;
      renderCars(data);
    });
});

function renderCars(cars) {
  const tbody = document.getElementById("cars-table-body");
  tbody.innerHTML = "";
  cars.forEach(car => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${car.name}</td>
      <td><i class="fa-solid ${car.available ? 'fa-circle-check text-success' : 'fa-circle-xmark text-danger'} icon-tooltip" data-tooltip="${car.available ? 'Dostupné' : 'Nedostupné'}"></i></td>
      <td><i class="fa-solid ${car.tuning ? 'fa-wrench text-success' : 'fa-xmark text-danger'} icon-tooltip" data-tooltip="${car.tuning ? 'Tuning' : 'Bez tuningu'}"></i></td>
      <td><i class="fa-solid ${car.wrap ? 'fa-circle-check text-success' : 'fa-circle-xmark text-danger'} icon-tooltip" data-tooltip="${car.wrap ? 'S polepem' : 'Bez polepu'}"></i></td>
      <td>${car.speed}</td>
      <td>${car.price}</td>
      <td>${car.tax}</td>
      <td><button class="btn btn-primary btn-sm" onclick="showDetail('${car.id}')"><i class="fa-solid fa-eye me-1"></i>Zobrazit</button></td>
    `;
    tbody.appendChild(row);
  });
}

function showDetail(id) {
  const car = window.carData.find(c => c.id === id);
  if (!car) return;
  const section = document.getElementById("car-detail");
  section.classList.remove("d-none");
  document.getElementById("main-content").classList.add("d-none");
  section.innerHTML = `
    <a href="#" onclick="backToList()" class="btn btn-primary mb-3"><i class="fa-solid fa-arrow-left"></i> Zpět na seznam</a>
    <h2 class="text-center">${car.name}</h2>
    <div class="text-center mb-4">
      <img src="${car.image}" class="img-fluid rounded shadow" style="max-height: 500px;">
    </div>
    <ul class="list-group mb-4">
      <li class="list-group-item"><i class="fa-solid fa-circle-check me-2"></i>Dostupnost: ${car.available ? "Možné pronajmout" : "Není dostupné"}</li>
      <li class="list-group-item"><i class="fa-solid fa-wrench me-2"></i>Úpravy: ${car.tuning ? "Je upravené" : "Žádné úpravy"}</li>
      <li class="list-group-item"><i class="fa-solid fa-screwdriver-wrench me-2"></i> Seznam tuningových dílů: ${car.parts || "Neuvedeno"}</li>
      <li class="list-group-item"><i class="fa-solid fa-paint-roller me-2"></i>Polep: ${car.wrap ? "S polepem" : "Bez polepu"} </li>
      <li class="list-group-item"><i class="fa-solid fa-gauge-high me-2"></i>Nejvyšší naměřená rychlost: ${car.speed || "Neuvedeno"}</li>
      <li class="list-group-item"><i class="fa-solid fa-euro-sign me-2"></i>Cena za den: ${car.price}</li>
      <li class="list-group-item"><i class="fa-solid fa-euro-sign me-2"></i>Daň: ${car.tax}</li>
      <li class="list-group-item"><i class="fa-solid fa-note-sticky me-2"></i>Poznámka: ${car.note || "Žádná"}</li>
    </ul>
    <h5 class="mb-4 text-center fw-bold">Líbí se vozidlo? Objednejte si jej!</h5>
    <form id="order-form" class="border p-3 rounded bg-light">
      <input type="hidden" name="vozidlo" value="${car.name}">

      <div class="row mb-2">
        <label class="col-sm-3 col-form-label">Vaše jméno</label>
        <div class="col-sm-9">
          <input type="text" name="jmeno" class="form-control" placeholder="Jméno Příjmení" required>
        </div>
      </div>

      <div class="row mb-2">
        <label class="col-sm-3 col-form-label">Telefonní číslo</label>
        <div class="col-sm-9">
          <input type="text" name="telefon" class="form-control" placeholder="123456" minlength="6" maxlength="6" pattern="\\d{6}" required>
        </div>
      </div>

      <div class="row mb-2">
        <label class="col-sm-3 col-form-label">Email</label>
        <div class="col-sm-9">
          <div class="input-group">
            <input type="email" name="email" class="form-control" placeholder="jmeno.prijmeni@post.ic" required>
          </div>
        </div>
      </div>

      <div class="row mb-2">
        <label class="col-sm-3 col-form-label">Doba pronájmu</label>
        <div class="col-sm-9">
          <div class="input-group">
            <input type="number" name="doba" class="form-control" placeholder="7" min="1" max="14" required>
            <span class="input-group-text">Max 14 dní</span>
          </div>
        </div>
      </div>

      <div class="row mb-2">
        <label class="col-sm-3 col-form-label">Slevový kód</label>
        <div class="col-sm-9">
          <div class="input-group">
            <input type="text" name="kod" class="form-control">
            <span class="input-group-text">Nepovinné</span>
          </div>
        </div>
      </div>

      <div class="row mb-2">
        <label class="col-sm-3 col-form-label">Odkud nás znáte?</label>
        <div class="col-sm-9">
          <div class="input-group">
            <input type="text" name="zdroj" class="form-control">
            <span class="input-group-text">Nepovinné</span>
          </div>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-12 text-center small text-muted">
          Potvrzením této objednávky souhlasíte s podmínkami <a href="#" data-bs-toggle="modal" data-bs-target="#termsModal">Premium Cars</a>.
        </div>
      </div>

      <div class="text-center">
        <button type="submit" class="btn btn-success">
          <i class="fa-solid fa-cart-shopping"></i> Objednat
        </button>
      </div>
    </form>
        <div id="status" class="mt-3"></div>
  `;

  document.getElementById("order-form").addEventListener("submit", e => {
    e.preventDefault();

    const form = e.target;
    const emailInput = form.querySelector('input[name="email"]');
    const email = emailInput.value.trim();

    if (!email.endsWith("@post.ic")) {
      document.getElementById("status").innerHTML = '<div class="alert alert-danger">Email musí končit na <strong>@post.ic</strong>.</div>';
      emailInput.classList.add("is-invalid");
      return;
    } else {
      emailInput.classList.remove("is-invalid");
    }

    const data = new FormData(form);
    const d = Object.fromEntries(data.entries());

    const embed = {
      username: "Premium Cars",
      avatar_url: "https://i.imgur.com/RL90ReM.png",
      embeds: [{
        title: "Nová objednávka vozidla",
        color: 0x002e6c,
        thumbnail: {
          url: "https://i.imgur.com/RL90ReM.png"
        },
        fields: [
          { name: "Jméno a Příjmení", value: d.jmeno, inline: true },
          { name: "Telefon", value: d.telefon, inline: true },
          { name: "Email", value: d.email, inline: true },
          { name: "Vozidlo", value: d.vozidlo, inline: true },
          { name: "Doba pronájmu", value: `${d.doba} dní`, inline: true },
          { name: "Slevový kód", value: d.kod || "—", inline: true },
          { name: "Odkud nás znáte", value: d.zdroj || "—", inline: false }
        ],
        footer: {
          text: "Všechna práva vyhrazena Premium Cars",
          icon_url: "https://i.imgur.com/RL90ReM.png"
        },
        timestamp: new Date().toISOString()
      }]
    };

    fetch("https://discord.com/api/webhooks/1371171905876267177/1a2QsMczcDduKr5ASRqZQaaw5d7zjLkZNNGHIK80JVK_MZe_WcB2F3STXT3vMNGYObIT", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(embed)
    })
    .then(() => {
      document.getElementById("status").innerHTML = '<div class="alert alert-success">Objednávka odeslána!</div>';
      form.reset();
    })
    .catch(() => {
      document.getElementById("status").innerHTML = '<div class="alert alert-danger">Chyba při odesílání.</div>';
    });
  });
}

function backToList() {
  document.getElementById("main-content").classList.remove("d-none");
  const section = document.getElementById("car-detail");
  section.classList.add("d-none");
  section.innerHTML = "";
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
});
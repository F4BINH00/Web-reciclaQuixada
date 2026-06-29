const mapa = L.map("mapa-coleta", {
  maxZoom: 18,
}).setView([-4.9708, -39.0154], 15);

const mapaPadrao = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution: "&copy; OpenStreetMap contributors",
    maxZoom: 19,
  },
);

const mapaSatelite = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {
    attribution: "Tiles &copy; Esri",
    maxZoom: 18,
    maxNativeZoom: 17,
  },
);

const nomesLugares = L.tileLayer(
  "https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
  {
    attribution: "Labels &copy; Esri",
    maxZoom: 18,
  },
);

const nomesRuas = L.tileLayer(
  "https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}",
  {
    attribution: "Roads &copy; Esri",
    maxZoom: 18,
  },
);

const sateliteComNomes = L.layerGroup([mapaSatelite, nomesRuas, nomesLugares]);

mapaPadrao.addTo(mapa);

const camadasBase = {
  Mapa: mapaPadrao,
  Satélite: sateliteComNomes,
};

L.control
  .layers(camadasBase, null, {
    collapsed: false,
  })
  .addTo(mapa);

const campoBusca = document.getElementById("busca-mapa");
const botaoBusca = document.getElementById("btn-buscar-mapa");

let marcadorBusca = null;

async function buscarLocalNoMapa() {
  const termo = campoBusca.value.trim();

  if (termo === "") {
    alert("Digite um endereço, rua ou bairro para buscar.");
    return;
  }

  let latitudeCentro = -4.9708;
  let longitudeCentro = -39.0154;

  if (termo.toLowerCase() === "centro") {
    mapa.setView([latitudeCentro, longitudeCentro], 16);

    if (marcadorBusca) {
      mapa.removeLayer(marcadorBusca);
    }

    marcadorBusca = L.marker([latitudeCentro, longitudeCentro])
      .addTo(mapa)
      .bindPopup("<strong>Centro de Quixadá</strong>")
      .openPopup();

    return;
  }

  const consulta = `${termo}, Quixadá, Ceará, Brasil`;

  try {
    const resposta = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&limit=5&countrycodes=br&viewbox=-39.08,-4.92,-38.96,-5.03&bounded=1&q=${encodeURIComponent(consulta)}`,
    );
    const resultados = await resposta.json();

    if (resultados.length === 0) {
      alert("Local não encontrado. Tente buscar por outro endereço ou bairro.");
      return;
    }

    const local = resultados[0];
    const latitude = Number(local.lat);
    const longitude = Number(local.lon);

    mapa.setView([latitude, longitude], 17);

    if (marcadorBusca) {
      mapa.removeLayer(marcadorBusca);
    }

    marcadorBusca = L.marker([latitude, longitude])
      .addTo(mapa)
      .bindPopup(`<strong>${termo}</strong><br>Resultado da busca`)
      .openPopup();
  } catch (erro) {
    console.error(erro);
    alert("Não foi possível realizar a busca no mapa.");
  }
}

botaoBusca.addEventListener("click", buscarLocalNoMapa);

campoBusca.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    buscarLocalNoMapa();
  }
});

const botaoMinhaLocalizacao = document.getElementById("btn-minha-localizacao");

botaoMinhaLocalizacao.addEventListener("click", function () {
  mapa.locate({
    setView: true,
    maxZoom: 16,
  });
});

mapa.on("locationfound", function (event) {
  L.marker(event.latlng)
    .addTo(mapa)
    .bindPopup("Você está aproximadamente aqui.")
    .openPopup();
});

mapa.on("locationerror", function () {
  alert(
    "Não foi possível acessar sua localização. Verifique a permissão do navegador.",
  );
});

const tokenPontos = localStorage.getItem("token");

const listaCatadoresProximos = document.getElementById(
  "lista-catadores-proximos",
);
const statusCatadores = document.getElementById("status-catadores");

async function carregarCatadoresProximos() {
  if (!listaCatadoresProximos) {
    return;
  }

  try {
    const resposta = await fetch("http://localhost:1337/api/catadors", {
      headers: {
        Authorization: `Bearer ${tokenPontos}`,
      },
    });

    if (!resposta.ok) {
      throw new Error("Erro ao buscar catadores.");
    }

    const dados = await resposta.json();
    const catadores = dados.data || [];

    if (catadores.length === 0) {
      if (statusCatadores) {
        statusCatadores.textContent = "Sem registros";
      }

      listaCatadoresProximos.innerHTML = `
        <div class="empty-state compact">
          <i class="bi bi-people"></i>
          <h4>Nenhum catador cadastrado</h4>
          <p>Quando houver catadores cadastrados, eles aparecerão aqui.</p>
        </div>
      `;
      return;
    }

    if (statusCatadores) {
      statusCatadores.textContent =
        catadores.length === 1 ? "1 cadastro" : `${catadores.length} cadastros`;
    }

    listaCatadoresProximos.innerHTML = "";

    catadores.slice(0, 3).forEach(function (catador) {
      const item = catador.attributes || catador;

      const nome =
        item.nome ||
        item.nome_completo ||
        item.username ||
        "Catador cadastrado";

      const bairro =
        item.bairro || item.endereco || "Localização não informada";

      const inicial = nome.charAt(0).toUpperCase();

      const div = document.createElement("div");
      div.classList.add("collector");

      div.innerHTML = `
        <div class="collector-avatar">${inicial}</div>

        <div class="collector-info">
          <h4>${nome}</h4>
          <p>
            <i class="bi bi-geo-alt"></i>
            ${bairro}
          </p>
        </div>
      `;

      listaCatadoresProximos.appendChild(div);
    });
  } catch (erro) {
    console.error("Erro ao carregar catadores:", erro);

    if (statusCatadores) {
      statusCatadores.textContent = "Indisponível";
    }

    listaCatadoresProximos.innerHTML = `
      <div class="empty-state compact">
        <i class="bi bi-exclamation-triangle"></i>
        <h4>Não foi possível carregar os catadores</h4>
        <p>Verifique se o Strapi está rodando e tente novamente.</p>
      </div>
    `;
  }
}

carregarCatadoresProximos();

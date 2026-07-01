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
const materiaisPadraoColeta = [
  "Papelão",
  "Papel branco",
  "Livros",
  "Revistas",
  "Cadernos velhos",
  "Ferro",
  "Latinha de alumínio",
  "Vidros",
  "Garrafas",
  "Litros",
  "Plástico",
  "Garrafa PET",
  "Balde",
  "Bacia",
  "Tambores",
  "Sacolas plásticas",
  "Óleo de cozinha",
  "Eletroeletrônicos",
];
const pontosFixosColeta = [
  {
    nome: "Ovos Carvil",
    bairro: "Campo Velho",
    endereco: "Rua Dom Lucas, Campo Velho, Quixadá - CE, 63900-000",
    materiais: materiaisPadraoColeta,
    responsavel: "CONSERCE e AMMA",
    apoio: "Associação de Catadores e Recicladores de Quixadá",
    tipo: "Ponto fixo de coleta seletiva",
    observacao: "Coleta seletiva periódica de materiais recicláveis.",
    latitude: -4.964150820498856,
    longitude: -39.00679944593996,
  },
  {
    nome: "Banco do Nordeste",
    bairro: "Centro",
    endereco: "Rua Pascoal Crispino, 215 - Centro, Quixadá - CE, 63900-153",
    palavrasChave: ["bnb", "banco", "banco do nordeste"],
    materiais: materiaisPadraoColeta,
    responsavel: "CONSERCE e AMMA",
    apoio: "Associação de Catadores e Recicladores de Quixadá",
    tipo: "Ponto fixo de coleta seletiva",
    observacao: "Coleta seletiva periódica de materiais recicláveis.",
    latitude: -4.9704173021924305,
    longitude: -39.01536833244749,
  },
  {
    nome: "Faculdade de Medicina Estácio",
    bairro: "Jardim dos Monólitos",
    endereco:
      "Avenida Jesus Maria e José, S/N, Quadra 40, Lote 100 - Jardim dos Monólitos, Quixadá - CE, 63909-003",
    materiais: materiaisPadraoColeta,
    responsavel: "CONSERCE e AMMA",
    apoio: "Associação de Catadores e Recicladores de Quixadá",
    tipo: "Ponto fixo de coleta seletiva",
    observacao: "Coleta seletiva periódica de materiais recicláveis.",
    latitude: -4.945059455358807,
    longitude: -38.99423257125675,
  },
  {
    nome: "Universidade Federal do Ceará",
    bairro: "Cedro",
    endereco:
      "Avenida José Freitas Queiroz, 5003 - Cedro, Quixadá - CE, 63902-580",
    palavrasChave: ["ufc", "universidade", "campus cedro", "federal"],
    materiais: materiaisPadraoColeta,
    responsavel: "CONSERCE e AMMA",
    apoio: "Associação de Catadores e Recicladores de Quixadá",
    tipo: "Ponto fixo de coleta seletiva",
    observacao: "Coleta seletiva periódica de materiais recicláveis.",
    latitude: -4.979273063055103,
    longitude: -39.056279361283124,
  },
  {
    nome: "Colégio Estadual Gonzaga Mota",
    bairro: "Planalto Renascer",
    endereco: "Rua Paraguai, 2165 - Planalto Renascer, Quixadá - CE, 63900-000",
    materiais: materiaisPadraoColeta,
    responsavel: "CONSERCE e AMMA",
    apoio: "Associação de Catadores e Recicladores de Quixadá",
    tipo: "Ponto fixo de coleta seletiva",
    observacao: "Coleta seletiva periódica de materiais recicláveis.",
    latitude: -4.959343687640395,
    longitude: -39.02840441525328,
  },
  {
    nome: "CEJA João Ricardo da Silveira",
    bairro: "Campo Velho",
    endereco: "Rua Dom Lucas, 760 - Campo Velho, Quixadá - CE, 63900-000",
    materiais: materiaisPadraoColeta,
    responsavel: "CONSERCE e AMMA",
    apoio: "Associação de Catadores e Recicladores de Quixadá",
    tipo: "Ponto fixo de coleta seletiva",
    observacao: "Coleta seletiva periódica de materiais recicláveis.",
    latitude: -4.964358766188691,
    longitude: -39.00532934779076,
  },
  {
    nome: "Control Enel",
    bairro: "Centro",
    endereco: "Travessa Tiradentes, 155 - Centro, Quixadá - CE, 63900-129",
    materiais: materiaisPadraoColeta,
    responsavel: "CONSERCE e AMMA",
    apoio: "Associação de Catadores e Recicladores de Quixadá",
    tipo: "Ponto fixo de coleta seletiva",
    observacao: "Coleta seletiva periódica de materiais recicláveis.",
    latitude: -4.9691621018271785,
    longitude: -39.01404673244759,
  },
  {
    nome: "Ellca Enel",
    bairro: "Centro",
    endereco: "Rua Clarindo de Queiroz, 329 - Centro, Quixadá - CE, 63900-117",
    materiais: materiaisPadraoColeta,
    responsavel: "CONSERCE e AMMA",
    apoio: "Associação de Catadores e Recicladores de Quixadá",
    tipo: "Ponto fixo de coleta seletiva",
    observacao: "Coleta seletiva periódica de materiais recicláveis.",
    latitude: -4.970943336908967,
    longitude: -39.01312053244756,
  },
  {
    nome: "Cagece",
    bairro: "Centro",
    endereco: "Rua José Jucá, 270 - Centro, Quixadá - CE, 63900-085",
    materiais: materiaisPadraoColeta,
    responsavel: "CONSERCE e AMMA",
    apoio: "Associação de Catadores e Recicladores de Quixadá",
    tipo: "Ponto fixo de coleta seletiva",
    observacao: "Coleta seletiva periódica de materiais recicláveis.",
    latitude: -4.971011367800195,
    longitude: -39.014787503611494,
  },
  {
    nome: "AMMA - Autarquia Municipal de Meio Ambiente",
    bairro: "Centro",
    palavrasChave: ["amma", "meio ambiente", "autarquia"],
    endereco: "Rua Tabelião Enéas, 649 - Centro, Quixadá - CE, 63900-169",
    materiais: materiaisPadraoColeta,
    responsavel: "CONSERCE e AMMA",
    apoio: "Associação de Catadores e Recicladores de Quixadá",
    tipo: "Ponto fixo de coleta seletiva",
    observacao: "Coleta seletiva periódica de materiais recicláveis.",
    latitude: -4.968545624612156,
    longitude: -39.01691374223795,
  },
  {
    nome: "EEF Maria de Lourdes Ferreira de Lima",
    bairro: "Distrito de Califórnia",
    endereco: "Estrada para Quixadá, 187 - Califórnia, Quixadá - CE, 63900-000",
    materiais: ["Papel", "Plástico", "Metal", "Vidro"],
    responsavel: "CONSERCE e AMMA",
    apoio: "Associação de Catadores e Recicladores de Quixadá",
    tipo: "Ponto fixo de coleta seletiva",
    observacao: "Coleta seletiva periódica de materiais recicláveis.",
    latitude: -4.765553286004746,
    longitude: -39.013400588270066,
  },
  {
    nome: "CONSERCE",
    bairro: "Combate",
    endereco:
      "Rua Francisco Segundo da Costa, 374 - Combate, Quixadá - CE, 63900-000",
    palavrasChave: ["conserce", "consorcio", "residuos"],
    materiais: materiaisPadraoColeta,
    responsavel: "CONSERCE e AMMA",
    apoio: "Associação de Catadores e Recicladores de Quixadá",
    tipo: "Ponto fixo de coleta seletiva",
    observacao: "Coleta seletiva periódica de materiais recicláveis.",
    latitude: -4.970495029715764,
    longitude: -39.02147878213896,
  },
  {
    nome: "Residencial Rachel de Queiroz",
    bairro: "Cedro",
    endereco: "Rua José Jucá Neto - Cedro, Quixadá - CE",
    materiais: materiaisPadraoColeta,
    responsavel: "CONSERCE e AMMA",
    apoio: "Associação de Catadores e Recicladores de Quixadá",
    tipo: "Ponto fixo de coleta seletiva",
    observacao: "Coleta seletiva periódica de materiais recicláveis.",
    latitude: -4.971385014002254,
    longitude: -39.014678761283164,
  },
];

mapaPadrao.addTo(mapa);

const grupoPontosFixos = L.layerGroup().addTo(mapa);

const camadasBase = {
  Mapa: mapaPadrao,
  Satélite: sateliteComNomes,
};

const camadasExtras = {
  "Pontos fixos": grupoPontosFixos,
};

L.control
  .layers(camadasBase, camadasExtras, {
    collapsed: false,
  })
  .addTo(mapa);

function criarPopupPontoColeta(ponto) {
  return `
    <div class="popup-ponto-coleta">
      <strong>${ponto.nome}</strong>
      <p><strong>Tipo:</strong> ${ponto.tipo}</p>
      <p><strong>Bairro:</strong> ${ponto.bairro}</p>
      <p><strong>Endereço:</strong> ${ponto.endereco}</p>
      <p><strong>Materiais:</strong> ${ponto.materiais.join(", ")}</p>
      <p><strong>Responsável/Gestão:</strong> ${ponto.responsavel}</p>
      <p><strong>Apoio/Execução:</strong> ${ponto.apoio}</p>
      <p>${ponto.observacao}</p>
    </div>
  `;
}

function carregarPontosFixosNoMapa() {
  pontosFixosColeta.forEach(function (ponto) {
    if (!ponto.latitude || !ponto.longitude) {
      return;
    }

    L.marker([ponto.latitude, ponto.longitude])
      .addTo(grupoPontosFixos)
      .bindPopup(criarPopupPontoColeta(ponto));
  });

  const coordenadas = pontosFixosColeta
    .filter(function (ponto) {
      return ponto.latitude && ponto.longitude;
    })
    .map(function (ponto) {
      return [ponto.latitude, ponto.longitude];
    });

  if (coordenadas.length > 0) {
    mapa.fitBounds(coordenadas, {
      padding: [40, 40],
    });
  }
}

carregarPontosFixosNoMapa();

const campoBusca = document.getElementById("busca-mapa");
const botaoBusca = document.getElementById("btn-buscar-mapa");

let marcadorBusca = null;

async function buscarLocalNoMapa() {
  if (!campoBusca) {
    return;
  }

  const termo = campoBusca.value.trim();

  if (termo === "") {
    alert("Digite um endereço, rua ou bairro para buscar.");
    return;
  }

  const termoNormalizado = termo.toLowerCase();

  const pontoEncontrado = pontosFixosColeta.find(function (ponto) {
    const palavrasChave = ponto.palavrasChave || [];

    return (
      ponto.nome.toLowerCase().includes(termoNormalizado) ||
      ponto.bairro.toLowerCase().includes(termoNormalizado) ||
      ponto.endereco.toLowerCase().includes(termoNormalizado) ||
      palavrasChave.some(function (palavra) {
        return palavra.toLowerCase().includes(termoNormalizado);
      })
    );
  });

  if (pontoEncontrado) {
    mapa.setView([pontoEncontrado.latitude, pontoEncontrado.longitude], 17);

    L.popup()
      .setLatLng([pontoEncontrado.latitude, pontoEncontrado.longitude])
      .setContent(criarPopupPontoColeta(pontoEncontrado))
      .openOn(mapa);

    return;
  }

  let latitudeCentro = -4.9708;
  let longitudeCentro = -39.0154;

  if (termoNormalizado === "centro") {
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
      `https://nominatim.openstreetmap.org/search?format=json&limit=5&countrycodes=br&viewbox=-39.08,-4.92,-38.96,-5.03&bounded=1&q=${encodeURIComponent(
        consulta,
      )}`,
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

if (botaoBusca && campoBusca) {
  botaoBusca.addEventListener("click", buscarLocalNoMapa);

  campoBusca.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      buscarLocalNoMapa();
    }
  });
}

const botaoMinhaLocalizacao = document.getElementById("btn-minha-localizacao");

if (botaoMinhaLocalizacao) {
  botaoMinhaLocalizacao.addEventListener("click", function () {
    mapa.locate({
      setView: true,
      maxZoom: 16,
    });
  });
}

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
      div.style.cursor = "pointer";

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

      div.addEventListener("click", function () {
        const localizacao = localizacoesCatadores[bairro];

        if (!localizacao) {
          alert("Localização aproximada não cadastrada para este catador.");
          return;
        }

        mapa.setView([localizacao.latitude, localizacao.longitude], 16);

        L.popup()
          .setLatLng([localizacao.latitude, localizacao.longitude])
          .setContent(
            `
      <strong>${nome}</strong><br>
      ${bairro}<br>
      ${item.area_atuacao || "Atuação não informada"}
    `,
          )
          .openOn(mapa);
      });

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
const localizacoesCatadores = {
  "Planalto Universitário": {
    latitude: -4.9758,
    longitude: -39.0415,
  },
  Combate: {
    latitude: -4.970495029715764,
    longitude: -39.02147878213896,
  },
};

carregarCatadoresProximos();

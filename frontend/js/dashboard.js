const dashboardMap = L.map("dashboard-map", {
  zoomControl: false,
  dragging: false,
  scrollWheelZoom: false,
  doubleClickZoom: false,
}).setView([-4.9708, -39.0154], 14);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(dashboardMap);

L.marker([-4.9708, -39.0154])
  .addTo(dashboardMap)
  .bindPopup("Região central de Quixadá");

const token = localStorage.getItem("token");
const saudacaoDashboard = document.getElementById("dashboard-saudacao");

function obterPrimeiroNome(nomeCompleto) {
  if (!nomeCompleto) {
    return "usuário";
  }

  return nomeCompleto.trim().split(" ")[0];
}

async function carregarUsuarioDashboard() {
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  try {
    const resposta = await fetch("http://localhost:1337/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const usuario = await resposta.json();

    if (!resposta.ok) {
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      window.location.href = "login.html";
      return;
    }

    const nomeCompleto = usuario.nome_completo || usuario.username || "Usuário";
    const primeiroNome = obterPrimeiroNome(nomeCompleto);

    saudacaoDashboard.textContent = `Olá, ${primeiroNome}!`;
  } catch (erro) {
    console.error("Erro ao carregar usuário:", erro);
  }
}

async function buscarDados(endpoint) {
  try {
    const resposta = await fetch(`http://localhost:1337/api/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!resposta.ok) {
      console.warn(`Não foi possível buscar ${endpoint}.`);
      return [];
    }

    const dados = await resposta.json();
    return dados.data || [];
  } catch (erro) {
    console.error(`Erro ao buscar ${endpoint}:`, erro);
    return [];
  }
}

function calcularImpacto(descartes) {
  return descartes.reduce(function (total, descarte) {
    const item = descarte.attributes || descarte;

    const peso =
      Number(item.peso_kg) ||
      Number(item.quantidade_kg) ||
      Number(item.quantidade) ||
      0;

    return total + peso;
  }, 0);
}

async function carregarResumoDashboard() {
  const pontos = await buscarDados("ponto-de-coletas");
  const coletas = await buscarDados("solicitacao-de-coletas");
  const descartes = await buscarDados("descartes");

   carregarMateriaisMaisDescartados(descartes);

   const impacto = calcularImpacto(descartes);
  
  document.getElementById("total-pontos-coleta").textContent = pontos.length;
  document.getElementById("total-coletas").textContent = coletas.length;
  document.getElementById("total-descartes").textContent = descartes.length;
  document.getElementById("total-impacto").textContent =
    `${impacto.toFixed(1)} kg`;

  document.getElementById("texto-pontos-coleta").textContent =
    pontos.length === 1 ? "ponto cadastrado" : "pontos cadastrados";

  document.getElementById("texto-coletas").textContent =
    coletas.length === 1
      ? "solicitação registrada"
      : "solicitações registradas";

  document.getElementById("texto-descartes").textContent =
    descartes.length === 1 ? "descarte registrado" : "descartes registrados";

  document.getElementById("texto-impacto").textContent =
    impacto > 0 ? "de resíduos reciclados" : "aguardando registros";
}
// Busca da dashboard

const campoBuscaDashboard = document.getElementById("dashboard-search");
const botaoBuscaDashboard = document.getElementById("dashboard-search-button");

function realizarBuscaDashboard() {
  if (!campoBuscaDashboard) {
    return;
  }

  const termo = campoBuscaDashboard.value.trim().toLowerCase();

  if (!termo) {
    alert("Digite algo para buscar.");
    return;
  }

  if (
    termo.includes("ponto") ||
    termo.includes("coleta") ||
    termo.includes("ecoponto")
  ) {
    window.location.href =
      `pontos-coleta.html?busca=${encodeURIComponent(termo)}`;
    return;
  }

  if (
    termo.includes("plástico") ||
    termo.includes("plastico") ||
    termo.includes("papel") ||
    termo.includes("vidro") ||
    termo.includes("metal") ||
    termo.includes("óleo") ||
    termo.includes("oleo") ||
    termo.includes("pilha") ||
    termo.includes("eletrônico") ||
    termo.includes("eletronico") ||
    termo.includes("isopor")
  ) {
    window.location.href =
      `educacao.html?busca=${encodeURIComponent(termo)}`;
    return;
  }

  window.location.href =
    `educacao.html?busca=${encodeURIComponent(termo)}`;
}

if (botaoBuscaDashboard && campoBuscaDashboard) {
  botaoBuscaDashboard.addEventListener(
    "click",
    realizarBuscaDashboard
  );

  campoBuscaDashboard.addEventListener(
    "keydown",
    function (event) {
      if (event.key === "Enter") {
        realizarBuscaDashboard();
      }
    }
  );
}
function formatarDataCompleta(dataTexto) {
  if (!dataTexto) {
    return "--";
  }

  const data = new Date(dataTexto);

  return data.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });
}

function formatarDia(dataTexto) {
  if (!dataTexto) {
    return "--";
  }

  const data = new Date(dataTexto);

  return data.toLocaleDateString("pt-BR", {
    day: "2-digit",
  });
}

function formatarMes(dataTexto) {
  if (!dataTexto) {
    return "--";
  }

  const data = new Date(dataTexto);

  return data.toLocaleDateString("pt-BR", {
    month: "short",
  });
}

async function carregarProximaColeta() {
  const container = document.getElementById("proxima-coleta-dashboard");

  if (!container) {
    return;
  }

  const coletas = await buscarDados("solicitacao-de-coletas");

  if (coletas.length === 0) {
    container.innerHTML = `
      <div class="empty-state compact">
        <i class="bi bi-calendar-x"></i>
        <h4>Nenhuma coleta agendada</h4>
        <p>Quando houver uma solicitação registrada, ela aparecerá aqui.</p>
      </div>
    `;
    return;
  }

  const primeiraColeta = coletas[0].attributes || coletas[0];

  const dataColeta =
    primeiraColeta.data_coleta ||
    primeiraColeta.data ||
    primeiraColeta.createdAt;

  const tipoColeta =
    primeiraColeta.tipo_residuo ||
    primeiraColeta.material ||
    "Coleta solicitada";

  const horario =
    primeiraColeta.horario ||
    primeiraColeta.periodo ||
    "Horário não informado";

  container.innerHTML = `
    <div class="collect-box">
      <div class="date">
        <strong>${formatarDia(dataColeta)}</strong>
        <span>${formatarMes(dataColeta)}</span>
      </div>

      <div>
        <h4>${tipoColeta}</h4>
        <p>${formatarDataCompleta(dataColeta)}</p>
        <p>${horario}</p>
      </div>
    </div>
  `;
}
carregarUsuarioDashboard();
carregarResumoDashboard();
carregarProximaColeta();
carregarUsuarioDashboard();
carregarResumoDashboard();
function carregarMateriaisMaisDescartados(descartes) {
  const container = document.getElementById("materiais-dashboard");

  if (!container) {
    return;
  }

  if (!descartes || descartes.length === 0) {
    container.innerHTML = `
      <div class="empty-state compact">
        <i class="bi bi-bar-chart"></i>
        <h4>Sem dados suficientes</h4>
        <p>Os materiais mais descartados aparecerão quando houver registros.</p>
      </div>
    `;
    return;
  }

  const contagem = {};

  descartes.forEach(function (descarte) {
    const item = descarte.attributes || descarte;

    const material =
      item.material ||
      item.tipo_residuo ||
      item.nome ||
      "Não informado";

    contagem[material] = (contagem[material] || 0) + 1;
  });

  const materiaisOrdenados = Object.entries(contagem).sort(function (a, b) {
    return b[1] - a[1];
  });

  const total = descartes.length;

  container.innerHTML = "";

  materiaisOrdenados.slice(0, 4).forEach(function ([material, quantidade]) {
    const porcentagem = Math.round((quantidade / total) * 100);

    const div = document.createElement("div");
    div.classList.add("material");

    div.innerHTML = `
      <span>${material}</span>
      <div class="progress">
        <div style="width: ${porcentagem}%;"></div>
      </div>
      <strong>${porcentagem}%</strong>
    `;

    container.appendChild(div);
  });
}

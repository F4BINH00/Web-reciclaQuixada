const tokenDescartes = localStorage.getItem("token");

const totalDescartesUsuario = document.getElementById("total-descartes-usuario");
const textoDescartesUsuario = document.getElementById("texto-descartes-usuario");
const ultimoDescarteData = document.getElementById("ultimo-descarte-data");
const ultimoDescarteTexto = document.getElementById("ultimo-descarte-texto");
const impactoDescartesUsuario = document.getElementById("impacto-descartes-usuario");
const textoImpactoDescartes = document.getElementById("texto-impacto-descartes");
const listaDescartesUsuario = document.getElementById("lista-descartes-usuario");
const statusHistoricoDescartes = document.getElementById("status-historico-descartes");

async function buscarUsuarioLogado() {
  const resposta = await fetch("http://localhost:1337/api/users/me", {
    headers: {
      Authorization: `Bearer ${tokenDescartes}`
    }
  });

  if (!resposta.ok) {
    throw new Error("Usuário não autenticado.");
  }

  return await resposta.json();
}

async function buscarDescartesDoUsuario(usuarioId) {
  const resposta = await fetch(
    `http://localhost:1337/api/descartes?filters[usuario][id][$eq]=${usuarioId}&sort=createdAt:desc`,
    {
      headers: {
        Authorization: `Bearer ${tokenDescartes}`
      }
    }
  );

  if (!resposta.ok) {
    console.warn("Não foi possível buscar descartes. Verifique permissões ou relação no Strapi.");
    return [];
  }

  const dados = await resposta.json();
  return dados.data || [];
}

function obterDadosDescarte(descarte) {
  return descarte.attributes || descarte;
}

function calcularImpacto(descartes) {
  return descartes.reduce(function (total, descarte) {
    const item = obterDadosDescarte(descarte);

    const peso =
      Number(item.peso_kg) ||
      Number(item.quantidade_kg) ||
      Number(item.quantidade) ||
      0;

    return total + peso;
  }, 0);
}

function formatarData(dataTexto) {
  if (!dataTexto) {
    return "--";
  }

  const data = new Date(dataTexto);

  return data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short"
  });
}

function renderizarEstadoVazio() {
  totalDescartesUsuario.textContent = "0";
  textoDescartesUsuario.textContent = "nenhum registro encontrado";

  ultimoDescarteData.textContent = "--";
  ultimoDescarteTexto.textContent = "sem descartes ainda";

  impactoDescartesUsuario.textContent = "0 kg";
  textoImpactoDescartes.textContent = "aguardando registros";

  statusHistoricoDescartes.textContent = "Sem registros";

  listaDescartesUsuario.innerHTML = `
    <div class="empty-state">
      <i class="bi bi-recycle"></i>
      <h4>Nenhum descarte registrado ainda</h4>
      <p>Quando você registrar descartes, seu histórico aparecerá aqui.</p>
      <a href="solicita-coleta.html" class="btn-primary">
        <i class="bi bi-truck"></i>
        Solicitar coleta
      </a>
    </div>
  `;
}

function renderizarDescartes(descartes) {
  const total = descartes.length;
  const impacto = calcularImpacto(descartes);
  const ultimo = obterDadosDescarte(descartes[0]);

  totalDescartesUsuario.textContent = total;
  textoDescartesUsuario.textContent =
    total === 1 ? "registro encontrado" : "registros encontrados";

  ultimoDescarteData.textContent = formatarData(ultimo.createdAt);
  ultimoDescarteTexto.textContent =
    ultimo.material || ultimo.tipo_residuo || "descarte registrado";

  impactoDescartesUsuario.textContent = `${impacto.toFixed(1)} kg`;
  textoImpactoDescartes.textContent =
    impacto > 0 ? "resíduos reciclados" : "impacto ainda não calculado";

  statusHistoricoDescartes.textContent =
    total === 1 ? "1 registro" : `${total} registros`;

  listaDescartesUsuario.innerHTML = "";

  descartes.forEach(function (descarte) {
    const item = obterDadosDescarte(descarte);

    const material = item.material || item.tipo_residuo || "Material não informado";
    const status = item.status || "Registro realizado";
    const data = formatarData(item.createdAt);
    const quantidade = item.quantidade || item.peso_kg || item.quantidade_kg || "";

    const div = document.createElement("div");
    div.classList.add("schedule-item");

    div.innerHTML = `
      <strong>${data}</strong>
      <span>${material}</span>
      <span>${quantidade ? quantidade + " kg" : ""}</span>
      <span>${status}</span>
    `;

    listaDescartesUsuario.appendChild(div);
  });
}

async function carregarMeusDescartes() {
  if (!tokenDescartes) {
    window.location.href = "login.html";
    return;
  }

  try {
    const usuario = await buscarUsuarioLogado();
    const descartes = await buscarDescartesDoUsuario(usuario.id);

    if (descartes.length === 0) {
      renderizarEstadoVazio();
      return;
    }

    renderizarDescartes(descartes);

  } catch (erro) {
    console.error("Erro ao carregar descartes:", erro);

    listaDescartesUsuario.innerHTML = `
      <div class="empty-state">
        <i class="bi bi-exclamation-triangle"></i>
        <h4>Não foi possível carregar seus descartes</h4>
        <p>Verifique se o Strapi está rodando e tente novamente.</p>
      </div>
    `;
  }
}

carregarMeusDescartes();
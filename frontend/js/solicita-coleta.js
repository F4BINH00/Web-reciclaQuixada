const formSolicitacao = document.getElementById("form-solicitacao");
const botaoCancelar = document.getElementById("btn-cancelar");

formSolicitacao.addEventListener("submit", async function (event) {
  event.preventDefault();

  const tipoMaterial = document.getElementById("material").value;
  const quantidade = document.getElementById("quantidade").value;
  const endereco = document.getElementById("endereco").value;
  const bairro = document.getElementById("bairro").value;
  const dataColeta = document.getElementById("data").value;
  const horarioPreferido = document.getElementById("horario").value;
  const observacoes = document.getElementById("observacoes").value;

  const dadosSolicitacao = {
    data: {
      tipo_material: tipoMaterial,
      quantidade: quantidade.toLowerCase(),
      endereco: endereco,
      bairro: bairro,
      data_coleta: dataColeta,
      horario_preferido: horarioPreferido,
      observacoes: observacoes,
      situacao: "pendente",
    },
  };

  try {
    const resposta = await fetch(
      "http://localhost:1337/api/solicitacao-de-coletas",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosSolicitacao),
      },
    );

    if (!resposta.ok) {
      throw new Error("Erro ao enviar solicitação.");
    }

    alert("Solicitação de coleta enviada com sucesso!");
    formSolicitacao.reset();
  } catch (erro) {
    console.error(erro);
    alert(
      "Não foi possível enviar a solicitação. Verifique se o Strapi está rodando.",
    );
  }
});

botaoCancelar.addEventListener("click", function () {
  formSolicitacao.reset();
});
const tokenColeta = localStorage.getItem("token");
const listaProximasColetas = document.getElementById("proximas-coletas");

function formatarDataColeta(dataTexto) {
  if (!dataTexto) {
    return "Data não informada";
  }

  const data = new Date(dataTexto);

  return data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
}

async function carregarProximasColetas() {
  if (!listaProximasColetas) {
    return;
  }

  try {
    const resposta = await fetch(
      "http://localhost:1337/api/solicitacao-de-coletas?sort=createdAt:desc",
      {
        headers: {
          Authorization: `Bearer ${tokenColeta}`,
        },
      },
    );

    if (!resposta.ok) {
      throw new Error("Erro ao buscar solicitações de coleta.");
    }

    const dados = await resposta.json();
    const coletas = dados.data || [];

    if (coletas.length === 0) {
      listaProximasColetas.innerHTML = `
        <div class="empty-state compact">
          <i class="bi bi-calendar-x"></i>
          <h4>Nenhuma coleta agendada</h4>
          <p>As próximas coletas aparecerão aqui quando forem cadastradas.</p>
        </div>
      `;
      return;
    }

    listaProximasColetas.innerHTML = "";

    coletas.slice(0, 3).forEach(function (coleta) {
      const item = coleta.attributes || coleta;

      const material =
        item.tipo_material ||
        item.tipo_residuo ||
        item.material ||
        "Coleta solicitada";

      const data = item.data_coleta || item.data || item.createdAt;

      const div = document.createElement("div");
      div.classList.add("schedule-item");

      div.innerHTML = `
        <strong>${formatarDataColeta(data)}</strong>
        <span>${material}</span>
      `;

      listaProximasColetas.appendChild(div);
    });
  } catch (erro) {
    console.error("Erro ao carregar próximas coletas:", erro);

    listaProximasColetas.innerHTML = `
      <div class="empty-state compact">
        <i class="bi bi-exclamation-triangle"></i>
        <h4>Não foi possível carregar as coletas</h4>
        <p>Verifique se o Strapi está rodando.</p>
      </div>
    `;
  }
}
async function verificarPerfilNaTelaColeta() {
  const token = localStorage.getItem("token");

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
      window.location.href = "login.html";
      return;
    }

    if (usuario.tipo_usuario === "catador") {
      transformarTelaParaCatador(token);
    }
  } catch (erro) {
    console.error("Erro ao verificar perfil:", erro);
  }
}

async function transformarTelaParaCatador(token) {
  const formulario = document.querySelector("form");

  if (!formulario) {
    return;
  }

  const painelFormulario =
    formulario.closest(".panel") || formulario.parentElement;

  painelFormulario.innerHTML = `
    <h3>Solicitações de Coleta</h3>
    <p class="form-description">
      Como catador/coletor, você pode acompanhar e atualizar a situação das solicitações registradas.
    </p>

    <div id="lista-solicitacoes-catador">
      <div class="empty-state compact">
        <i class="bi bi-hourglass-split"></i>
        <h4>Carregando solicitações</h4>
        <p>Aguarde enquanto buscamos os registros.</p>
      </div>
    </div>
  `;

  await carregarSolicitacoesParaCatador(token);
}

async function carregarSolicitacoesParaCatador(token) {
  const container = document.getElementById("lista-solicitacoes-catador");

  if (!container) {
    return;
  }

  try {
    const resposta = await fetch(
      "http://localhost:1337/api/solicitacao-de-coletas?sort=createdAt:desc",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const dados = await resposta.json();

    if (!resposta.ok) {
      console.error("Erro ao buscar solicitações:", resposta.status, dados);
      throw new Error("Erro ao buscar solicitações.");
    }

    const solicitacoes = (dados.data || []).filter(function (solicitacao) {
      const item = solicitacao.attributes || solicitacao;
      const situacao = item.situacao || "pendente";

      return situacao === "pendente" || situacao === "aceita";
    });

    if (solicitacoes.length === 0) {
      container.innerHTML = `
        <div class="empty-state compact">
          <i class="bi bi-clipboard-check"></i>
          <h4>Nenhuma solicitação pendente</h4>
          <p>Não há solicitações aguardando atendimento no momento.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = "";

    solicitacoes.forEach(function (solicitacao) {
      const item = solicitacao.attributes || solicitacao;

      const idSolicitacao = solicitacao.documentId || solicitacao.id;

      const tipoMaterial = item.tipo_material || "Material não informado";
      const quantidade = item.quantidade || "Quantidade não informada";
      const bairro = item.bairro || "Bairro não informado";
      const endereco = item.endereco || "Endereço não informado";
      const situacao = item.situacao || "pendente";

      const card = document.createElement("div");
      card.classList.add("solicitacao-card");

      const botoes =
        situacao === "pendente"
          ? `
            <button
              type="button"
              class="btn-primary"
              onclick="atualizarSituacaoColeta('${idSolicitacao}', 'aceita')"
            >
              Aceitar
            </button>

            <button
              type="button"
              class="btn-danger"
              onclick="atualizarSituacaoColeta('${idSolicitacao}', 'cancelada')"
            >
              Cancelar
            </button>
          `
          : `
            <button
              type="button"
              class="btn-secondary"
              onclick="atualizarSituacaoColeta('${idSolicitacao}', 'concluida')"
            >
              Concluir
            </button>

            <button
              type="button"
              class="btn-danger"
              onclick="atualizarSituacaoColeta('${idSolicitacao}', 'cancelada')"
            >
              Cancelar
            </button>
          `;

      card.innerHTML = `
        <div class="solicitacao-card-header">
          <h4>${tipoMaterial}</h4>
          <span class="status-badge">${situacao}</span>
        </div>

        <p><strong>Quantidade:</strong> ${quantidade}</p>
        <p><strong>Bairro:</strong> ${bairro}</p>
        <p><strong>Endereço:</strong> ${endereco}</p>

        <div class="form-buttons">
          ${botoes}
        </div>
      `;

      container.appendChild(card);
    });
  } catch (erro) {
    console.error("Erro ao carregar solicitações:", erro);

    container.innerHTML = `
      <div class="empty-state compact">
        <i class="bi bi-exclamation-triangle"></i>
        <h4>Não foi possível carregar as solicitações</h4>
        <p>Verifique as permissões no Strapi e tente novamente.</p>
      </div>
    `;
  }
}

async function atualizarSituacaoColeta(idSolicitacao, novaSituacao) {
  const token = localStorage.getItem("token");

  try {
    const resposta = await fetch(
      `http://localhost:1337/api/solicitacao-de-coletas/${idSolicitacao}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: {
            situacao: novaSituacao,
          },
        }),
      },
    );

    const dados = await resposta.json();

    console.log("Status da atualização:", resposta.status);
    console.log("Resposta da atualização:", dados);

    if (!resposta.ok) {
      alert(
        `Não foi possível atualizar a solicitação. Erro ${resposta.status}`,
      );
      return;
    }

    alert(`Solicitação atualizada para: ${novaSituacao}`);
    carregarSolicitacoesParaCatador(token);
  } catch (erro) {
    console.error("Erro ao atualizar solicitação:", erro);
    alert("Não foi possível atualizar a solicitação.");
  }
}

verificarPerfilNaTelaColeta();
carregarProximasColetas();

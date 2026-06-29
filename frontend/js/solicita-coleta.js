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

carregarProximasColetas();

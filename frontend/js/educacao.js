const listaResiduos = document.getElementById("lista-residuos");

async function carregarResiduos() {
  try {
    const resposta = await fetch("http://localhost:1337/api/residuos");

    if (!resposta.ok) {
      throw new Error("Erro ao buscar resíduos.");
    }

    const dados = await resposta.json();
    const residuos = dados.data;

    listaResiduos.innerHTML = "";

    if (residuos.length === 0) {
      listaResiduos.innerHTML = `
        <p class="muted">
          Nenhuma orientação de descarte cadastrada até o momento.
        </p>
      `;
      return;
    }

    residuos.forEach(function (residuo) {
      const item = document.createElement("div");
      item.classList.add("education-item");

      item.innerHTML = `
        <h4>
          <i class="bi bi-recycle"></i>
          ${residuo.nome}
        </h4>

        <p><strong>Categoria:</strong> ${residuo.categoria}</p>

        <p>${residuo.descricao || "Sem descrição cadastrada."}</p>

        <p>
          <strong>Orientação de descarte:</strong>
          ${residuo.orientacao_descarte || "Orientação ainda não cadastrada."}
        </p>
      `;

      listaResiduos.appendChild(item);
    });

  } catch (erro) {
    console.error(erro);

    listaResiduos.innerHTML = `
      <p class="muted">
        Não foi possível carregar as orientações. Verifique se o Strapi está rodando.
      </p>
    `;
  }
}

carregarResiduos();
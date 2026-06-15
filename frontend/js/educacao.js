const listaResiduos = document.getElementById("lista-residuos");

const imagensResiduos = {
  Plástico: "img/plastico.png",
  Papel: "img/papel.png",
  Papelão: "img/papelao.png",
  Vidro: "img/vidro.png",
  Metal: "img/metal.png",
  Alumínio: "img/aluminio.png",
  "Embalagem longa vida": "img/emb-long-vida.png",
  Eletrônicos: "img/eletronico.png",
  "Óleo de cozinha usado": "img/oleo.png",
  "Pilhas e baterias": "img/pilhas.png",
  Isopor: "img/isopor.png",
};

const iconesResiduos = {
  Plástico: "bi-cup-straw",
  Papel: "bi-file-earmark-text",
  Papelão: "bi-box-seam",
  Vidro: "bi-cup",
  Metal: "bi-nut",
  Alumínio: "bi-cup-hot",
  "Embalagem longa vida": "bi-box",
  Eletrônicos: "bi-phone",
  "Óleo de cozinha usado": "bi-droplet-half",
  "Pilhas e baterias": "bi-battery-charging",
  Isopor: "bi-box2",
};

async function carregarResiduos() {
  try {
    const resposta = await fetch("http://localhost:1337/api/residuos");

    if (!resposta.ok) {
      throw new Error("Erro ao buscar resíduos.");
    }

    const dados = await resposta.json();
    const residuos = dados.data;

    atualizarCardsEducacao(residuos);

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
      const itemResiduo = residuo.attributes || residuo;

      const nome = itemResiduo.nome;
      const imagem = imagensResiduos[nome] || "img/reciclagem-banner.png";
      const icone = iconesResiduos[nome] || "bi-recycle";

      const item = document.createElement("article");
      item.classList.add("education-item");

      item.innerHTML = `
        <img 
          src="${imagem}" 
          alt="Ilustração sobre ${nome}" 
          class="education-image"
        >

        <div class="education-content">
          <div class="education-title">
            <i class="bi ${icone}"></i>
            <h4>${nome}</h4>
          </div>

          <span class="education-category">
            ${itemResiduo.categoria}
          </span>

          <p>
            ${itemResiduo.descricao || "Sem descrição cadastrada."}
          </p>

          <div class="education-tip">
            <strong>Orientação de descarte:</strong>
            <p>
              ${itemResiduo.orientacao_descarte || "Orientação ainda não cadastrada."}
            </p>
          </div>
        </div>
      `;

      listaResiduos.appendChild(item);
    });
  } catch (erro) {
    console.error(erro);

    atualizarCardsEducacao([]);

    listaResiduos.innerHTML = `
      <p class="muted">
        Não foi possível carregar as orientações. Verifique se o Strapi está rodando.
      </p>
    `;
  }
}
function atualizarCardsEducacao(residuos) {
  const totalGuias = document.getElementById("total-guias-educativos");
  const textoGuias = document.getElementById("texto-guias-educativos");

  const totalMateriais = document.getElementById("total-materiais-reciclaveis");
  const textoMateriais = document.getElementById("texto-materiais-reciclaveis");

  const totalDicas = document.getElementById("total-dicas-sustentaveis");
  const textoDicas = document.getElementById("texto-dicas-sustentaveis");

  const quantidadeConteudos = residuos.length;

  const categorias = residuos
    .map(function (residuo) {
      const item = residuo.attributes || residuo;
      return item.categoria;
    })
    .filter(Boolean);

  const categoriasUnicas = [...new Set(categorias)];

  const dicasRapidas = document.querySelectorAll(".dicas-rapidas li").length;

  if (totalGuias) {
    totalGuias.textContent = quantidadeConteudos;
  }

  if (textoGuias) {
    textoGuias.textContent =
      quantidadeConteudos === 1
        ? "conteúdo disponível"
        : "conteúdos disponíveis";
  }

  if (totalMateriais) {
    totalMateriais.textContent = categoriasUnicas.length;
  }

  if (textoMateriais) {
    textoMateriais.textContent =
      categoriasUnicas.length === 1
        ? "categoria explicada"
        : "categorias explicadas";
  }

  if (totalDicas) {
    totalDicas.textContent = dicasRapidas;
  }

  if (textoDicas) {
    textoDicas.textContent =
      dicasRapidas === 1 ? "boa prática exibida" : "boas práticas exibidas";
  }
}

carregarResiduos();

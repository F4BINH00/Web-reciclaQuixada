const botaoNotificacao = document.getElementById("notification-button");
const dropdownNotificacao = document.getElementById("notification-dropdown");
const botaoAlternarNotificacao = document.getElementById("notification-toggle");
const statusNotificacao = document.getElementById("notification-status");
const bolinhaNotificacao = document.getElementById("notification-dot");

const botaoUsuario = document.getElementById("user-menu-button");
const dropdownUsuario = document.getElementById("user-dropdown");
const botaoSair = document.getElementById("logout-button");

let notificacoesAtivas = localStorage.getItem("notificacoesAtivas");

if (notificacoesAtivas === null) {
  notificacoesAtivas = "true";
  localStorage.setItem("notificacoesAtivas", notificacoesAtivas);
}

function atualizarEstadoNotificacoes() {
  const ativas = localStorage.getItem("notificacoesAtivas") === "true";

  if (ativas) {
    statusNotificacao.textContent = "Ativas";
    statusNotificacao.classList.remove("disabled");
    bolinhaNotificacao.classList.remove("disabled");

    botaoAlternarNotificacao.innerHTML = `
      <i class="bi bi-bell-slash"></i>
      Desativar notificações
    `;
  } else {
    statusNotificacao.textContent = "Desativadas";
    statusNotificacao.classList.add("disabled");
    bolinhaNotificacao.classList.add("disabled");

    botaoAlternarNotificacao.innerHTML = `
      <i class="bi bi-bell"></i>
      Ativar notificações
    `;
  }
}

if (botaoNotificacao) {
  botaoNotificacao.addEventListener("click", function (event) {
    event.stopPropagation();

    dropdownNotificacao.classList.toggle("active");

    if (dropdownUsuario) {
      dropdownUsuario.classList.remove("active");
    }
  });
}

if (botaoAlternarNotificacao) {
  botaoAlternarNotificacao.addEventListener("click", function () {
    const ativas = localStorage.getItem("notificacoesAtivas") === "true";

    localStorage.setItem("notificacoesAtivas", String(!ativas));
    atualizarEstadoNotificacoes();
  });
}

if (botaoUsuario) {
  botaoUsuario.addEventListener("click", function (event) {
    event.stopPropagation();

    dropdownUsuario.classList.toggle("active");

    if (dropdownNotificacao) {
      dropdownNotificacao.classList.remove("active");
    }
  });
}

if (botaoSair) {
  botaoSair.addEventListener("click", function () {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.href = "login.html";
  });
}

document.addEventListener("click", function () {
  if (dropdownNotificacao) {
    dropdownNotificacao.classList.remove("active");
  }

  if (dropdownUsuario) {
    dropdownUsuario.classList.remove("active");
  }
});

atualizarEstadoNotificacoes();

const saudacoesUsuario = document.querySelectorAll(".saudacao-usuario");
const tokenTopbar = localStorage.getItem("token");

function obterPrimeiroNomeTopbar(nomeCompleto) {
  if (!nomeCompleto) {
    return "usuário";
  }

  return nomeCompleto.trim().split(" ")[0];
}

async function carregarSaudacaoTopbar() {
  if (!tokenTopbar) {
    return;
  }

  try {
    const resposta = await fetch("http://localhost:1337/api/users/me", {
      headers: {
        Authorization: `Bearer ${tokenTopbar}`
      }
    });

    const usuario = await resposta.json();

    if (!resposta.ok) {
      return;
    }

    const nomeCompleto = usuario.nome_completo || usuario.username || "Usuário";
    const primeiroNome = obterPrimeiroNomeTopbar(nomeCompleto);

    saudacoesUsuario.forEach(function (item) {
      item.textContent = `Olá, ${primeiroNome}!`;
    });

  } catch (erro) {
    console.error("Erro ao carregar saudação:", erro);
  }
}

carregarSaudacaoTopbar();
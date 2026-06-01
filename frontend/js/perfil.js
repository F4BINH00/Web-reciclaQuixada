const token = localStorage.getItem("token");

const perfilNome = document.getElementById("perfil-nome");
const perfilEmail = document.getElementById("perfil-email");
const perfilCpf = document.getElementById("perfil-cpf");
const perfilTelefone = document.getElementById("perfil-telefone");
const perfilEndereco = document.getElementById("perfil-endereco");
const perfilTipo = document.getElementById("perfil-tipo");

const perfilSaudacao = document.getElementById("perfil-saudacao");
const perfilInicial = document.getElementById("perfil-inicial");
const perfilNomeResumo = document.getElementById("perfil-nome-resumo");

function formatarTipoUsuario(tipo) {
  const tipos = {
    cidadao: "Cidadão",
    catador: "Catador/Coletor",
    comercio_escola: "Comércio/Escola"
  };

  return tipos[tipo] || "Não informado";
}

function obterPrimeiroNome(nomeCompleto) {
  if (!nomeCompleto) {
    return "usuário";
  }

  return nomeCompleto.trim().split(" ")[0];
}

async function carregarPerfil() {
  if (!token) {
    alert("Você precisa estar logado para acessar o perfil.");
    window.location.href = "login.html";
    return;
  }

  try {
    const resposta = await fetch("http://localhost:1337/api/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const usuario = await resposta.json();

    if (!resposta.ok) {
      console.error("Erro ao carregar perfil:", usuario);
      alert("Não foi possível carregar os dados do perfil.");
      window.location.href = "login.html";
      return;
    }

    const nomeCompleto = usuario.nome_completo || usuario.username || "Usuário";
    const primeiroNome = obterPrimeiroNome(nomeCompleto);

    perfilNome.textContent = nomeCompleto;
    perfilEmail.textContent = usuario.email || "Não informado";
    perfilCpf.textContent = usuario.cpf || "Não informado";
    perfilTelefone.textContent = usuario.telefone || "Não informado";
    perfilEndereco.textContent = usuario.endereco || "Não informado";
    perfilTipo.textContent = formatarTipoUsuario(usuario.tipo_usuario);

    perfilSaudacao.textContent = `Olá, ${primeiroNome}!`;
    perfilInicial.textContent = primeiroNome.charAt(0).toUpperCase();
    perfilNomeResumo.textContent = nomeCompleto;

  } catch (erro) {
    console.error("Erro de conexão:", erro);
    alert("Erro ao conectar com o Strapi. Verifique se o backend está rodando.");
  }
}

carregarPerfil();
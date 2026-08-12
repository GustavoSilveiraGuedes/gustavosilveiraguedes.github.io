const API_URL = "http://localhost:8080/api/usuarios";

// ---------------------------------------------------------------
// CADASTRO
// ---------------------------------------------------------------
document.getElementById("form-cadastro")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.target;

  const dados = {
    nome: form.nome.value,
    email: form.email.value,
    senha: form.senha.value,
  };

  try {
    const response = await fetch(`${API_URL}/cadastro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    const resultado = await response.json();

    if (!response.ok) {
      alert(resultado.message || "Verifique os campos do formulario.");
      return;
    }

    alert(`Cadastro realizado com sucesso! Bem-vindo, ${resultado.nome}`);
    form.reset();

  } catch (erro) {
    console.error("Erro ao conectar com o servidor:", erro);
    alert("Nao foi possivel conectar ao servidor. Tente novamente.");
  }
});

// ---------------------------------------------------------------
// LOGIN
// ---------------------------------------------------------------
document.getElementById("form-login")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.target;

  const dados = {
    email: form.email.value,
    senha: form.senha.value,
  };

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    const resultado = await response.json();

    if (!response.ok) {
      alert(resultado.message || "Email ou senha invalidos.");
      return;
    }

    localStorage.setItem("usuario", JSON.stringify(resultado));
    alert(`Bem-vindo de volta, ${resultado.nome}!`);

  } catch (erro) {
    console.error("Erro ao conectar com o servidor:", erro);
    alert("Nao foi possivel conectar ao servidor. Tente novamente.");
  }
});
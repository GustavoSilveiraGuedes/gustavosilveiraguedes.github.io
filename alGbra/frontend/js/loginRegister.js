window.addEventListener("load", () => {

    console.log("Google Login inicializado");

    if (!window.google) {
        console.error("API do Google não carregou");
        return;
    }

    // Inicializa Google
    google.accounts.id.initialize({
        client_id: "154431325898-rspn81ndile98j638331324b7ugpmkhs.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });

    // Cria botão REAL do Google (invisível)
    google.accounts.id.renderButton(
        document.getElementById("googleRealButton"),
        {
            theme: "outline",
            size: "large"
        }
    );

    const googleButton = document.getElementById("googleCadastro");

    if (googleButton) {
        googleButton.addEventListener("click", (event) => {
            event.preventDefault();
            console.log("Botão Google clicado");

            const realButton = document.querySelector("#googleRealButton div[role=button]");

            if (realButton) {
                realButton.click();
            } else {
                console.error("Botão real do Google não encontrado");
            }
        });
    }

});


// Callback do Google
function handleCredentialResponse(response) {

    console.log("Resposta recebida do Google");

    const data = parseJwt(response.credential);

    console.log("Nome:", data.name);
    console.log("Email:", data.email);

    const emailInput = document.getElementById("iemal");
    const nameInput = document.getElementById("iname");

    if (emailInput) emailInput.value = data.email;
    if (nameInput) nameInput.value = data.name;

}


// Decodifica o token JWT
function parseJwt(token) {

    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
    );

    return JSON.parse(jsonPayload);

}


// ===== Cadastro de usuário (formulário normal) =====
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("iname").value;
        const email = document.getElementById("iemal").value;
        const password = document.getElementById("ipassword").value;
        const confirmPassword = document.getElementById("iconfirmPassword").value;

        if (password !== confirmPassword) {
            alert("As senhas não coincidem.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                window.location.href = "login.html";
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            alert("Erro ao conectar com o servidor.");
        }
    });
}
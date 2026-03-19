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

    if (!googleButton) {
        console.error("Botão custom não encontrado");
        return;
    }

    googleButton.addEventListener("click", (event) => {

        event.preventDefault();

        console.log("Botão Google clicado");

        // Simula clique no botão oficial do Google
        const realButton = document.querySelector("#googleRealButton div[role=button]");

        if (realButton) {
            realButton.click();
        } else {
            console.error("Botão real do Google não encontrado");
        }

    });

});


// Callback do Google
function handleCredentialResponse(response) {

    console.log("Resposta recebida do Google");

    const data = parseJwt(response.credential);

    console.log("Nome:", data.name);
    console.log("Email:", data.email);
    
    // Preenche automaticamente o formulário
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
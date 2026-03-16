window.addEventListener("load", () => {

    console.log("Google Login inicializado");

    if (!window.google) {
        console.error("API do Google não carregou");
        return;
    }

    google.accounts.id.initialize({
        client_id: "154431325898-rspn81ndile98j638331324b7ugpmkhs.apps.googleusercontent.com",
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true
    });

    const googleButton = document.getElementById("googleCadastro");

    if (!googleButton) {
        console.error("Botão Google não encontrado");
        return;
    }

    googleButton.addEventListener("click", (event) => {

        event.preventDefault();

        console.log("Botão Google clicado");

        // Cancela qualquer prompt anterior
        google.accounts.id.cancel();

        // Abre seletor de contas
        google.accounts.id.prompt((notification) => {

            if (notification.isNotDisplayed()) {
                console.warn("Prompt não exibido:", notification.getNotDisplayedReason());
            }

            if (notification.isSkippedMoment()) {
                console.warn("Prompt pulado:", notification.getSkippedReason());
            }

        });

    });

});


function handleCredentialResponse(response) {

    console.log("Resposta recebida do Google");

    const data = parseJwt(response.credential);

    console.log("Nome:", data.name);
    console.log("Email:", data.email);
    console.log("Foto:", data.picture);

    // Aqui você pode usar os dados no sistema futuramente
    // Exemplo: preencher campos automaticamente

    const emailInput = document.getElementById("iemal");
    const nameInput = document.getElementById("iname");

    if (emailInput) emailInput.value = data.email;
    if (nameInput) nameInput.value = data.name;

}


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
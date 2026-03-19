window.onload = function () {

    console.log("Google login iniciado");

    google.accounts.id.initialize({
        client_id: "154431325898-rspn81ndile98j638331324b7ugpmkhs.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });

    const googleButton = document.getElementById("googleCadastro");

    googleButton.addEventListener("click", function (event) {

        event.preventDefault();

        console.log("Botão Google clicado");

        google.accounts.id.prompt();

    });

};

function handleCredentialResponse(response) {

    const data = parseJwt(response.credential);

    console.log("Nome:", data.name);
    console.log("Email:", data.email);
    console.log("Foto:", data.picture);

}

function parseJwt(token) {

    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    const jsonPayload = decodeURIComponent(
        atob(base64)
        .split('')
        .map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);

}
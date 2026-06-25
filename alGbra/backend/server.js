const express = require("express");

const app = express();

app.get("/", (req, res) => {

    res.send("Algbra funcionando");

});

app.get("/formulas", (req, res) => {

    res.json([
        {
            id: 1,
            nome: "Função Primeiro Grau"
        },
        {
            id: 2,
            nome: "Função Segundo Grau"
        }
    ]);

});

app.listen(3000, () => {

    console.log("Servidor rodando na porta 3000");

});
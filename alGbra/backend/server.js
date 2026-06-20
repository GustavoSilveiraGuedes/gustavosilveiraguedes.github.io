const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

connection.connect((err) => {

    if (err) {
        console.error("Erro ao conectar no MySQL:", err);
        return;
    }

    console.log("Conectado ao MySQL!");

});

app.get("/formulas", (req, res) => {

    connection.query(
        "SELECT * FROM formula",
        (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(results);

        }
    );

});

app.listen(3000, () => {

    console.log("Servidor rodando em http://localhost:3000");

});
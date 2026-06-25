const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
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
        console.error("Erro ao conectar ao MySQL:", err.message);
        process.exit(1);
    }
    console.log("Conectado ao MySQL");
});

app.get("/", (req, res) => {
    res.send("Algbra funcionando");
});

// Rota de cadastro
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    // Validação básica
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Preencha todos os campos." });
    }

    try {
        // Verifica se o email já existe
        connection.query(
            "SELECT id FROM usuario WHERE email = ?",
            [email],
            async (err, results) => {
                if (err) {
                    console.error("Erro ao verificar email:", err.message);
                    return res.status(500).json({ message: "Erro interno no servidor." });
                }

                if (results.length > 0) {
                    return res.status(409).json({ message: "Este email já está cadastrado." });
                }

                // Criptografa a senha
                const senhaCriptografada = await bcrypt.hash(password, 10);

                // Insere o novo usuário
                connection.query(
                    "INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)",
                    [name, email, senhaCriptografada],
                    (err, result) => {
                        if (err) {
                            console.error("Erro ao inserir usuário:", err.message);
                            return res.status(500).json({ message: "Erro ao cadastrar usuário." });
                        }

                        return res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
                    }
                );
            }
        );
    } catch (error) {
        console.error("Erro inesperado:", error.message);
        res.status(500).json({ message: "Erro interno no servidor." });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
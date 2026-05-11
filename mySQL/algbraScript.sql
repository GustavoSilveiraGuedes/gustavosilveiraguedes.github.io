CREATE DATABASE algbra;
USE algbra;

CREATE TABLE usuario(
	id INT AUTO_INCREMENT,
	nome VARCHAR(100) NOT NULL,
	email VARCHAR(255) NOT NULL UNIQUE,
	senha VARCHAR(255), -- SENHA PODE SER NULA DEVIDO A API DO GOOGLE
	PRIMARY KEY (id)
);

CREATE TABLE formula(
	id INT AUTO_INCREMENT,
	nomePrimarioPT VARCHAR(100) NOT NULL,
    nomeSecundarioPT VARCHAR(100),
    nomeTercearioPT VARCHAR(100),
    nomePrimarioEN VARCHAR(100) NOT NULL,
    nomeSecundarioEN VARCHAR(100),
    nomeTercearioEN VARCHAR(100),
	materia VARCHAR(100) NOT NULL,
	conteudo VARCHAR(100) NOT NULL,
	numeroVariaveis INT,
	periodoEnsinado VARCHAR(3) NOT NULL,
	seculo VARCHAR(8) NOT NULL,
	autor VARCHAR(100),
	PRIMARY KEY (id)
);

CREATE TABLE desafioDiario(
	id INT AUTO_INCREMENT,
	formula_id INT NOT NULL,
	dataDesafio DATE NOT NULL UNIQUE,
	PRIMARY KEY (id),
	FOREIGN KEY (formula_id) REFERENCES formula(id)
);

CREATE TABLE participacao(
	usuario_id INT,
	desafioDiario_id INT,
	acertou TINYINT(1) NOT NULL,
	PRIMARY KEY (usuario_id, desafioDiario_id),
	FOREIGN KEY (usuario_id) REFERENCES usuario(id),
	FOREIGN KEY (desafioDiario_id) REFERENCES desafioDiario(id)
);
-- DROP DATABASE algbra;
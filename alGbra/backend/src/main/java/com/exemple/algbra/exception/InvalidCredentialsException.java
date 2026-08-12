package com.example.algbra.exception;

public class InvalidCredentialsException extends RuntimeException {

    public InvalidCredentialsException() {
        super("Email ou senha inválidos");
    }

}
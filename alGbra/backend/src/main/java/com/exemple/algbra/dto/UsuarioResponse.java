package com.example.algbra.dto;

import com.example.algbra.entity.Usuario;

public class UsuarioResponse {

    private Integer id;
    private String nome;
    private String email;

    public UsuarioResponse(Usuario usuario) {
        this.id = usuario.getId();
        this.nome = usuario.getNome();
        this.email = usuario.getEmail();
    }

    public Integer getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }
}
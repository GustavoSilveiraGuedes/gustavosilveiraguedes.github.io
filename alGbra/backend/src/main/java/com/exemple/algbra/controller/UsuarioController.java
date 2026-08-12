package com.example.algbra.controller;

import com.example.algbra.dto.CadastroRequest;
import com.example.algbra.dto.LoginRequest;
import com.example.algbra.dto.UsuarioResponse;
import com.example.algbra.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    @Autowired
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // POST /api/usuarios/cadastro
    @PostMapping("/cadastro")
    public ResponseEntity<UsuarioResponse> cadastrar(@Valid @RequestBody CadastroRequest request) {
        UsuarioResponse response = usuarioService.cadastrar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // POST /api/usuarios/login
    @PostMapping("/login")
    public ResponseEntity<UsuarioResponse> login(@Valid @RequestBody LoginRequest request) {
        UsuarioResponse response = usuarioService.login(request);
        return ResponseEntity.ok(response);
    }

}
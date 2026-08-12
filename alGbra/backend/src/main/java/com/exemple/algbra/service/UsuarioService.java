package com.example.algbra.service;

import com.example.algbra.dto.CadastroRequest;
import com.example.algbra.dto.LoginRequest;
import com.example.algbra.dto.UsuarioResponse;
import com.example.algbra.entity.Usuario;
import com.example.algbra.exception.EmailAlreadyExistsException;
import com.example.algbra.exception.InvalidCredentialsException;
import com.example.algbra.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UsuarioResponse cadastrar(CadastroRequest request) {
        String email = request.getEmail().trim().toLowerCase();

        if (usuarioRepository.existsByEmail(email)) {
            throw new EmailAlreadyExistsException(email);
        }

        String hash = passwordEncoder.encode(request.getSenha());

        Usuario usuario = new Usuario(request.getNome().trim(), email, hash);
        Usuario salvo = usuarioRepository.save(usuario);

        return new UsuarioResponse(salvo);
    }

    public UsuarioResponse login(LoginRequest request) {
        String email = request.getEmail().trim().toLowerCase();

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(InvalidCredentialsException::new);

        // Usuários cadastrados via Google (sem senha própria) não podem logar por aqui
        if (usuario.getSenha() == null || usuario.getSenha().isBlank()) {
            throw new InvalidCredentialsException();
        }

        if (!passwordEncoder.matches(request.getSenha(), usuario.getSenha())) {
            throw new InvalidCredentialsException();
        }

        return new UsuarioResponse(usuario);
    }

}
package com.grupo3.Proyecto.Integrador.service;

import com.grupo3.Proyecto.Integrador.model.Producto;
import com.grupo3.Proyecto.Integrador.model.Reserva;
import com.grupo3.Proyecto.Integrador.model.Usuario;
import com.grupo3.Proyecto.Integrador.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private UsuarioRepository usuarioRepository;

    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository) { this.usuarioRepository = usuarioRepository; }

    public Usuario crearUsuario(Usuario usuario) { return usuarioRepository.save(usuario); }

    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    public Usuario actualizarUsuario(Usuario usuario) { return usuarioRepository.save(usuario);}
}

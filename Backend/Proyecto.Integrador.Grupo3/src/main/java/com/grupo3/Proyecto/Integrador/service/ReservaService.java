package com.grupo3.Proyecto.Integrador.service;

import com.grupo3.Proyecto.Integrador.model.Producto;
import com.grupo3.Proyecto.Integrador.model.Reserva;
import com.grupo3.Proyecto.Integrador.model.Usuario;
import com.grupo3.Proyecto.Integrador.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@Service
public class ReservaService {

    private ReservaRepository reservaRepository;

    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private ProductoService productoService;

    @Autowired
    public ReservaService(ReservaRepository reservaRepository) { this.reservaRepository = reservaRepository; }

    public Reserva crearReserva(Reserva reserva) {
        Optional<Usuario> usuarioOptional = usuarioService.buscarPorId(reserva.getUsuario().getId());
        Optional<Producto> productoOptional = productoService.buscarPorId(reserva.getProducto().getId());
        if (usuarioOptional.isPresent() && productoOptional.isPresent()) {
            reserva.setUsuario(usuarioOptional.get());
            reserva.setProducto(productoOptional.get());
            return reservaRepository.save(reserva);
        }
        return null ;}


    public Optional<Reserva> buscarPorId(Long id) {
        return reservaRepository.findById(id);
    }

    public List<Producto> buscarPorFecha(LocalDate fechaInicial, LocalDate fechaFinal) { return reservaRepository.findAllByFechaInicialAndFechaFinal(fechaInicial, fechaFinal); }

    public List<Producto> buscarPorCiudadYFecha(String ciudad, LocalDate fechaInicial, LocalDate fechaFinal) { return reservaRepository.findAllByCiudadYFechas(ciudad, fechaInicial, fechaFinal); };

    public Reserva actualizarReserva(Reserva reserva) { return reservaRepository.save(reserva);}

    public List<Reserva> traerTodas() { return reservaRepository.findAll(); }

    public Optional<Reserva> buscarPorIDProducto(Long id) { return reservaRepository.findByProductoId(id); }

 //   public List<String> filtrarFechas(Date fechaInicial, Date fechaFinal) { return reservaRepository.findByStartDateBetween(fechaInicial, fechaFinal); }
}

package com.grupo3.Proyecto.Integrador.service;

import com.grupo3.Proyecto.Integrador.model.Reserva;
import com.grupo3.Proyecto.Integrador.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;


@Service
public class ReservaService {

    private ReservaRepository reservaRepository;

    @Autowired
    public ReservaService(ReservaRepository reservaRepository) { this.reservaRepository = reservaRepository; }

    public Reserva crearReserva(Reserva reserva) { return reservaRepository.save(reserva);}

    public Optional<Reserva> buscarPorId(Long id) {
        return reservaRepository.findById(id);
    }

//    public List<Reserva> buscarPorFecha(String fechaInicial, String fechaFinal) { return reservaRepository.findAllByFechaInicialAndFechaFinal(fechaInicial, fechaFinal); }

    public Reserva actualizarReserva(Reserva reserva) { return reservaRepository.save(reserva);}

    public List<Reserva> traerTodas() { return reservaRepository.findAll(); }

    public Optional<Reserva> buscarPorIDProducto(Long id) { return reservaRepository.findByProductoId(id); }

 //   public List<String> filtrarFechas(Date fechaInicial, Date fechaFinal) { return reservaRepository.findByStartDateBetween(fechaInicial, fechaFinal); }
}

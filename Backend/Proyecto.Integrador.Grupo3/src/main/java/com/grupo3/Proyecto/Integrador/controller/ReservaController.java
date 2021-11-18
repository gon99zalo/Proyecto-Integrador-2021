package com.grupo3.Proyecto.Integrador.controller;


import com.grupo3.Proyecto.Integrador.model.Reserva;
import com.grupo3.Proyecto.Integrador.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/reservas")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @PostMapping()
    public ResponseEntity<Reserva> crearReserva(@RequestBody Reserva reserva) {
        return ResponseEntity.ok(reservaService.crearReserva(reserva));
    }

    @GetMapping("buscar/{id}")
    public Optional<Reserva> buscarPorID(@PathVariable Long id) {
        return reservaService.buscarPorId(id);
    }

    @GetMapping("/fechas")
    public ResponseEntity<List<Reserva>> buscarPorFecha(@RequestParam("fechaInicial") String fechaInicial, @RequestParam("fechaFinal") String fechaFinal)
    { return ResponseEntity.ok(reservaService.buscarPorFecha(fechaInicial, fechaFinal)); }

    @PutMapping("/modificar")
    @ResponseBody
    public ResponseEntity<Reserva> actualizarReserva(@RequestParam Long id, @RequestBody Reserva r) {
        ResponseEntity<Reserva> respuesta = null;

        if (reservaService.buscarPorId(id).isPresent()) {
            Reserva reserva = reservaService.buscarPorId(id).get();
            reserva.setFechaInicial(r.getFechaInicial());
            reserva.setFechaFinal(r.getFechaFinal());
            reserva.setHora(r.getHora());

            respuesta = ResponseEntity.ok(reservaService.actualizarReserva(reserva));
        } else {
            respuesta = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return respuesta;
    }

    @GetMapping("/todos")
    public ResponseEntity<List<Reserva>> traerReservas() {
        return ResponseEntity.ok(reservaService.traerTodas());
    }

}

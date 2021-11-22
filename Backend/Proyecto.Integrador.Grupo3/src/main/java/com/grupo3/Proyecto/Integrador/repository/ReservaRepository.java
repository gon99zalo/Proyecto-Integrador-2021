package com.grupo3.Proyecto.Integrador.repository;

import com.grupo3.Proyecto.Integrador.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {

     List<Reserva> findAllByFechaInicialAndFechaFinal(String fechaInicial, String fechaFinal);

     Optional<Reserva> findByProductoId(Long id);

}

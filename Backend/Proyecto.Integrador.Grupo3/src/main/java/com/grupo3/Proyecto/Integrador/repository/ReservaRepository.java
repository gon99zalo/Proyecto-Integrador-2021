package com.grupo3.Proyecto.Integrador.repository;

import com.grupo3.Proyecto.Integrador.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {
     @Query("SELECT r FROM Reserva r WHERE r.fechaInicial >= ?1 AND r.fechaFinal <= ?2")
     List<Reserva> findAllByFechaInicialAndFechaFinal(LocalDate fechaInicial, LocalDate fechaFinal);

     Optional<Reserva> findByProductoId(Long id);

 /*    @Query("SELECT p FROM Producto p JOIN Reserva r BETWEEN fechaInicial AND fechaFinal")
     List<String> findByStartDateBetween(Date fechaInicial, Date fechaFinal);
*/
}

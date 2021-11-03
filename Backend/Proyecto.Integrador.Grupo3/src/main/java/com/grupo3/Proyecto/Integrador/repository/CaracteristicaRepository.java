package com.grupo3.Proyecto.Integrador.repository;

import com.grupo3.Proyecto.Integrador.model.Caracteristica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CaracteristicaRepository extends JpaRepository<Caracteristica, Long> {

}

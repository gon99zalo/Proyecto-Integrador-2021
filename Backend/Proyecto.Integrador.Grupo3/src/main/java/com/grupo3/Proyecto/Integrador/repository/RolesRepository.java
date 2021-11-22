package com.grupo3.Proyecto.Integrador.repository;

import com.grupo3.Proyecto.Integrador.model.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RolesRepository extends JpaRepository<Rol, Long> {

}

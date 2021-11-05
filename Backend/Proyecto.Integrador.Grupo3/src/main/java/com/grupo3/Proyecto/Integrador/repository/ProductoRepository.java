package com.grupo3.Proyecto.Integrador.repository;

import com.grupo3.Proyecto.Integrador.model.Categoria;
import com.grupo3.Proyecto.Integrador.model.Ciudad;
import com.grupo3.Proyecto.Integrador.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository

public interface ProductoRepository extends JpaRepository<Producto, Long> {

    @Query("FROM Categoria c WHERE titulo = ?1 ORDER BY id")
    List<Producto> listarPorCategoria(String titulo);

    @Query("FROM Ciudad c WHERE nombre = ?1 ORDER BY id")
    List<Producto> listarPorCiudad(String nombre);

}

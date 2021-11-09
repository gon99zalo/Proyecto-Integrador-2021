package com.grupo3.Proyecto.Integrador.repository;

import com.grupo3.Proyecto.Integrador.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface ProductoRepository extends JpaRepository<Producto, Long> {

    List<Producto> findAllByCategoriaTitulo(String titulo);

    List<Producto> findAllByCiudadNombre(String nombre);

    @Query("SELECT COUNT(u) FROM Producto u")
    Integer cantProductos();

}

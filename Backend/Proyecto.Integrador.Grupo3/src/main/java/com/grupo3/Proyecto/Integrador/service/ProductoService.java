package com.grupo3.Proyecto.Integrador.service;

import com.grupo3.Proyecto.Integrador.model.Categoria;
import com.grupo3.Proyecto.Integrador.model.Ciudad;
import com.grupo3.Proyecto.Integrador.model.Producto;
import com.grupo3.Proyecto.Integrador.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductoService {

    private ProductoRepository productoRepository;

    public List<Producto> productos = new ArrayList<Producto>();

    @Autowired
    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    public Producto crearProducto(Producto producto) {
        return productoRepository.save(producto);
    }

    public Optional<Producto> buscarPorId(Long id) {
        return productoRepository.findById(id);
    }

    public List<Producto> listarTodos() {
        return productoRepository.findAll();
    }

    public List<Producto> listarPorCategoria(String titulo) { return productoRepository.listarPorCategoria(titulo);}

    public List<Producto> listarPorCiudad(String nombre) { return productoRepository.listarPorCiudad(nombre);}


   /* public List<Producto> traerPorCategoria(Long id){
        productos.stream().filter(p -> p.getCategoria().getId() == p.getCategoria().getId()).collect(Collectors.toList());
    return productos;
    }

    public List<Producto> traerPorCiudad(Long id){
        productos.stream().filter(p -> p.getCiudad().getId() == p.getCiudad().getId()).collect(Collectors.toList());
    return productos;
    }*/

}

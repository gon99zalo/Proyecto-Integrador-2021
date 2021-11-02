package com.grupo3.Proyecto.Integrador.service;

import com.grupo3.Proyecto.Integrador.model.Categoria;
import com.grupo3.Proyecto.Integrador.model.Ciudad;
import com.grupo3.Proyecto.Integrador.model.Producto;
import com.grupo3.Proyecto.Integrador.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {

    private ProductoRepository productoRepository;

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

}

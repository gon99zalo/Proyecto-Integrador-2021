package com.grupo3.Proyecto.Integrador.controller;

import com.grupo3.Proyecto.Integrador.model.Categoria;
import com.grupo3.Proyecto.Integrador.model.Ciudad;
import com.grupo3.Proyecto.Integrador.model.Producto;
import com.grupo3.Proyecto.Integrador.service.CategoriaService;
import com.grupo3.Proyecto.Integrador.service.CiudadService;
import com.grupo3.Proyecto.Integrador.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/productos")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    @PostMapping()
    public ResponseEntity<Producto> agregarProducto(@RequestBody Producto producto) {
        return ResponseEntity.ok(productoService.crearProducto(producto));
    }

    @GetMapping("buscar/{id}")
    public Optional<Producto> buscarProductoPorID(@PathVariable Long id) {
        return productoService.buscarPorId(id);
    }

    @GetMapping("/todos")
    public ResponseEntity<List<Producto>> traerProductos() {
        return ResponseEntity.ok(productoService.listarTodos());
    }


    //Listar productos según categoría, es decir, nos deberá devolver los productos que pertenezcan a cierta categoría.

    @GetMapping("/categoria/{titulo}")
    public ResponseEntity<List<Producto>> traerPorCategoria(@PathVariable String titulo){ return ResponseEntity.ok(productoService.listarPorCategoria(titulo));}

    //Listar productos según ciudad, es decir, nos deberá devolver los productos que pertenezcan a cierta ciudad

    @GetMapping("/ciudad/{nombre}")
    public ResponseEntity<List<Producto>> traerPorCiudad(@PathVariable String nombre){ return ResponseEntity.ok(productoService.listarPorCiudad(nombre));}
}

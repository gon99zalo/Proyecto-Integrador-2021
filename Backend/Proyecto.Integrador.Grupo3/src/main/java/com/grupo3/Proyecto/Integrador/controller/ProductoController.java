package com.grupo3.Proyecto.Integrador.controller;

import com.grupo3.Proyecto.Integrador.model.Producto;
import com.grupo3.Proyecto.Integrador.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@CrossOrigin
@RestController
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

    @GetMapping("/categoria")
    public ResponseEntity<List<Producto>> listarPorCategoria(@RequestParam("titulo") String titulo){
        return ResponseEntity.ok(productoService.listarPorCategoria(titulo));}

    //Listar productos según ciudad, es decir, nos deberá devolver los productos que pertenezcan a cierta ciudad

    @GetMapping("/ciudad")
    public ResponseEntity<List<Producto>> listarPorCiudad(@RequestParam("nombre") String nombre) {
        return ResponseEntity.ok(productoService.listarPorCiudad(nombre));}

    @GetMapping("/cantidad")
    public ResponseEntity<Integer> cantidadProductos(){ return ResponseEntity.ok(productoService.cantProductos());}

}


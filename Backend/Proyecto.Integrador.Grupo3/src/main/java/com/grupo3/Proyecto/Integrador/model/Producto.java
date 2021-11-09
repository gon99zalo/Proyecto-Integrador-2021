package com.grupo3.Proyecto.Integrador.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "productos")
@Getter
@Setter
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String descripcion;
    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;
    @ManyToOne
    @JoinColumn(name = "ciudad_id")
    private Ciudad ciudad;
    @OneToMany
    @JoinColumn(name = "image_id")
    private List<Imagen> imagenes = new ArrayList<>();
    @ManyToMany
    @JoinColumn(name = "caract_id")
    private List<Caracteristica> caracteristicas = new ArrayList<>();

    public Producto() { }

    public Producto(String nombre, String descripcion, Categoria categoria, Ciudad ciudad) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.ciudad = ciudad;
    }

    @Override
    public String toString() {
        return "Producto{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", categoria=" + categoria +
                ", ciudad=" + ciudad +
                ", imagenes=" + imagenes +
                ", caracteristicas=" + caracteristicas +
                '}';
    }
}

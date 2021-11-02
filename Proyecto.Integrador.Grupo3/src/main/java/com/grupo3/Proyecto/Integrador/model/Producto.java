package com.grupo3.Proyecto.Integrador.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    @JoinColumn(name = "producto_cat")
    private Categoria categoria;
    @ManyToOne
    @JoinColumn(name = "producto_ciudad")
    private Ciudad ciudad;
    @OneToMany
    @JoinColumn(name = "producto_image")
    private List<Imagen> imagenes;
    @ManyToMany
    @JoinColumn(name = "producto_caract")
    private List<Caracteristica> caracteristicas;

    public Producto() { }


    public Producto(String nombre, String descripcion, Categoria categoria, Ciudad ciudad, List<Imagen> imagenes, List<Caracteristica> caracteristicas) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.ciudad = ciudad;
        this.imagenes = imagenes;
        this.caracteristicas = caracteristicas;
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

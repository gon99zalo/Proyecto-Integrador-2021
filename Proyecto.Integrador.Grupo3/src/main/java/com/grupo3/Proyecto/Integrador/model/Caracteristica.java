package com.grupo3.Proyecto.Integrador.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "caracteristicas")
@Getter
@Setter
public class Caracteristica {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String icono;
    @ManyToMany(mappedBy = "caracteristicas")
    private List<Producto> productos;

    public Caracteristica() { }

    public Caracteristica(String nombre, String icono, List<Producto> productos) {
        this.nombre = nombre;
        this.icono = icono;
        this.productos = productos;
    }

    @Override
    public String toString() {
        return "Caracteristica{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", icono='" + icono + '\'' +
                ", productos=" + productos +
                '}';
    }
}

package com.grupo3.Proyecto.Integrador.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "ciudades")
@Getter
@Setter
public class Ciudad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String pais;
    @OneToMany(mappedBy = "ciudad")
    private List<Producto> productos;

    public Ciudad() { }

    public Ciudad(String nombre, String pais, List<Producto> productos) {
        this.nombre = nombre;
        this.pais = pais;
        this.productos = productos;
    }

    @Override
    public String toString() {
        return "Ciudad{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", pais='" + pais + '\'' +
                ", productos=" + productos +
                '}';
    }
}

package com.grupo3.Proyecto.Integrador.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "imagenes")
@Getter
@Setter
public class Imagen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;
    private String url;
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JsonIgnore
    private List<Producto> productos = new ArrayList<>();

    public Imagen() { }

    public Imagen(String titulo, String url, List<Producto> productos) {
        this.titulo = titulo;
        this.url = url;
        this.productos = productos;
    }

    @Override
    public String toString() {
        return "Imagen{" +
                "id=" + id +
                ", titulo='" + titulo + '\'' +
                ", url='" + url + '\'' +
                '}';
    }
}

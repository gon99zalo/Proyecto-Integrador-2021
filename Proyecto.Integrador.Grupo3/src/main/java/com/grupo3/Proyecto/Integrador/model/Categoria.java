package com.grupo3.Proyecto.Integrador.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "categorias")
@Getter
@Setter
public class Categoria {
@Id
@SequenceGenerator(name = "categoria_sequence", sequenceName = "categoria_sequence")
@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "categoria_sequence")
private Long id;
private String titulo;
private String descripcion;
private String url;

    public Categoria() { }

    public Categoria(String titulo, String descripcion, String url) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.url = url;
    }

}

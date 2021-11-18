package com.grupo3.Proyecto.Integrador.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Table(name = "reservas")
@Getter
@Setter
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fechaInicial;
    private String fechaFinal;
    private String hora;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "producto_id")
    private Producto producto;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    public Reserva() { }

    public Reserva(String fechaInicial, String fechaFinal, String hora, Producto producto, Usuario usuario) {
        this.fechaInicial = fechaInicial;
        this.fechaFinal = fechaFinal;
        this.hora = hora;
        this.producto = producto;
        this.usuario = usuario;
    }

    @Override
    public String toString() {
        return "Reserva{" +
                "id=" + id +
                ", fechaInicial='" + fechaInicial + '\'' +
                ", fechaFinal='" + fechaFinal + '\'' +
                ", hora='" + hora + '\'' +
                ", producto=" + producto +
                ", usuario=" + usuario +
                '}';
    }
}

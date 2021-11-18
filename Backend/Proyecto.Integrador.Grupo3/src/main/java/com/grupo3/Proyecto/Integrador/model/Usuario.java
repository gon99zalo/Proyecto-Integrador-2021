package com.grupo3.Proyecto.Integrador.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.jetbrains.annotations.NotNull;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "usuarios")
@Getter
@Setter
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    @NotEmpty(message = "Debe ingresar el nombre")
    private String nombre;
    @Column(nullable = false)
    @NotEmpty(message = "Debe ingresar el apellido")
    private String apellido;
    @Column(nullable = false)
    @Email
    @NotEmpty(message = "Debe ingresar un email válido")
    private String email;
    @Column(nullable = false)
    @NotEmpty(message = "Debe ingresar una contraseña válida")
    private String contrasenia;
    @OneToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "usuario_id")
    @JsonIgnore
    private List<Reserva> reservas = new ArrayList<>();
    @OneToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "usuario_id")
    @JsonIgnore
    private List<Puntuacion> puntuaciones = new ArrayList<>();
    @ManyToOne
    @JoinColumn(name = "rol_id")
    private Rol rol;

    public Usuario() { }

    public Usuario(String nombre, String apellido, String email, String contrasenia, Rol rol) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.contrasenia = contrasenia;
        this.rol = rol;
    }

    public Usuario(String nombre, String apellido, String email, String contrasenia, List<Reserva> reservas, List<Puntuacion> puntuaciones, Rol rol) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.contrasenia = contrasenia;
        this.reservas = reservas;
        this.puntuaciones = puntuaciones;
        this.rol = rol;
    }

    @Override
    public String toString() {
        return "Usuario{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", apellido='" + apellido + '\'' +
                ", email='" + email + '\'' +
                ", contrasenia='" + contrasenia + '\'' +
                ", reservas=" + reservas +
                ", puntuaciones=" + puntuaciones +
                ", rol=" + rol +
                '}';
    }
}

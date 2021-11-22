package com.grupo3.Proyecto.Integrador.dto;

public class UsuarioLoginDTO {

    private String nombre;
    private String apellido;
    private String email;
    private String token;

    public UsuarioLoginDTO(String nombre, String apellido, String email, String token) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.token = token;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}





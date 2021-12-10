//@ts-nocheck
import { useEffect, useState } from "react";

const api = "http://ec2-3-135-186-132.us-east-2.compute.amazonaws.com:8080";

const getDataReservasUsuarios = async () => {

  let token = JSON.parse(sessionStorage.getItem("infoUsuario")).token;
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  let idUsuario = JSON.parse(jsonPayload).sub.split("'")[1];

  let configPost = {
    method: "GET",
    headers: {
      "Content-Type": "application/JSON",
      Authorization: JSON.parse(sessionStorage.getItem("infoUsuario")).token,
    },
  };

  const rawData = await fetch(api + "/reservas/usuario/" + idUsuario, configPost);
  const data = await rawData.json();
  const reservasUsuario = data.map( item => {
    return {
      fechaFinal: item.fechaFinal,
      fechaInicial: item.fechaInicial,
      hora: item.hora,
      producto: {
        caracteristicas: item.producto.caracteristicas.map( caract => {
          return {
            icono: caract.icono,
            nombre: caract.nombre,
          }
        }),
        categoria: {
          titulo: item.producto.categoria.titulo,
        },
        ciudad: {
          nombre: item.producto.ciudad.nombre,
          pais: item.producto.ciudad.pais,
        },
        id: item.producto.id,
        imagenes: [
          {
            url: item.producto.imagenes[0].url,
            titulo: item.producto.imagenes[0].titulo,
          }
        ],
        nombre: item.producto.nombre,
      },
    };
  });
  return reservasUsuario;
};

export default function useFetchReservasUsuario() {
  const [state, setState] = useState({
    data: [],
    loading: true,
    tieneError: false,
  });

  useEffect(() => {
    getDataReservasUsuarios()
      .then( response => {
        setState({
          data: response,
          loading: true,
          tieneError: false,
        });
      })
      .catch( error => {
        setState({
          data: error,
          loading: true,
          tieneError: true,
        });
      });
  }, []);

  return state;
};

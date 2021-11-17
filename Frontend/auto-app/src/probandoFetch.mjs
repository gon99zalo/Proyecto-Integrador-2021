import fetch from 'node-fetch';

const api = "http://localhost:8080";
    function ciudades() {
      fetch(api + "/ciudades/todas")
        .then((res) => res.json())
        .then(
          (result) => {
            console.log(result);
          },
          (error) => {
            console.log(error);
          }
        );
    }
    console.log(ciudades());
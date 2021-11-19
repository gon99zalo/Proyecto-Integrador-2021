import fetch from 'node-fetch';

//const api = "http://localhost:8080";
const api = "http://ec2-3-135-186-132.us-east-2.compute.amazonaws.com:8080"

// const getData = (api) => {
//   return fetch(api)
//   .then(response => response.json())
//   .then(response => response)
//   .catch(error => error);
// };
// export default getData;

    function getCiudades() {
      return fetch(api + "/ciudades/todas")
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
    console.log(getCiudades());

    export default getCiudades;
import { check, sleep } from "k6";
import http from "k6/http";

export let options = {
  stages: [
    { duration: "30s", target: 30 },
    { duration: "30s", target: 30 },
    { duration: "30s", target: 60 },
    { duration: "30s", target: 0 },
  ],
};

/**
 * Setup es el metodo para realizar configuracion iniciales antes de setear la prueba
 *
 * debe devolver un JSON con todos los datos parametricos que va a devolver nuestra prueba
 */
export function setup() {
  var url = "{URL}";
  var payload = JSON.stringify({
    user: "juan",
    password: "juan123",
  });

  var headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  var response = http.post(url, payload, headers);

  console.log(response.status);
  console.log(response.body);
  return {
    authResponse: JSON.parse(response.body),
  };
}

/**
 * Ahora que estamos usando setup nuestra funcion principal
 * resibe un parametro q sera el JSON que returna setup
 */
export default function (data) {
  var url = "{URL}";
  var headers = {
    headers: {
      Authorization: data.authResponse.token,
    },
  };

  var response = http.get(url, headers);
  check(response, {
    "status should be 200": (r) => r.status === 200,
  });

  sleep(1);
}

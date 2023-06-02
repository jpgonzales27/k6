import * as auth from "./resources/services/authentication";
import * as general from "./resources/services/general";
import * as hello from "./resources/services/hello.js";
import { check, sleep } from "k6";
import http from "k6/http";

export let options = {
  stages: [
    { duration: "10s", target: 15 },
    { duration: "10s", target: 15 },
    { duration: "10s", target: 30 },
    { duration: "10s", target: 0 },
  ],
};

/**
 * Setup es el metodo para realizar configuracion iniciales antes de setear la prueba
 *
 * debe devolver un JSON con todos los datos parametricos que va a devolver nuestra prueba
 */
export function setup() {
  var url = `${general.base_url}/${auth.url}`;
  var payload = JSON.stringify(auth.body);
  var headers = {
    headers: auth.headers,
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
  var url = `${general.base_url}/${hello.url}`;
  hello.headers["Authorization"] = data.authResponse.token;

  var response = http.get(url, hello.headers);
  check(response, {
    "status should be 200": (r) => r.status === 200,
  });

  sleep(1);
}

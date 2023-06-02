import * as auth_service from "../../services/authentication";
import * as hello_service from "../../services/hello";
import * as type_test from "./paramatrization";
import { check, sleep } from "k6";

export let options = type_test.types[__ENV.TYPE_TEST];

/**
 * Setup es el metodo para realizar configuracion iniciales antes de setear la prueba
 *
 * debe devolver un JSON con todos los datos parametricos que va a devolver nuestra prueba
 */
export function setup() {
  const response = auth_service.execute();

  console.log(response.status);
  console.log(response.body);
  return {
    authResponse: JSON.parse(response.body),
    // authResponse: JSON.parse(auth_service.execute().body),
  };
}

/**
 * Ahora que estamos usando setup nuestra funcion principal
 * resibe un parametro q sera el JSON que returna setup
 */
export default function (data) {
  console.log("Tipo de prueba: ", __ENV.TYPE_TEST);
  const response = hello_service.execute(data);
  check(response, {
    "status should be 200": (r) => r.status === 200,
  });

  sleep(1);
}

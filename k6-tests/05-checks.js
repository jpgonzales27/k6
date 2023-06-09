import { check } from "k6";
import http from "k6/http";

/**
 * Las checks son assertsiones, pero no detienen la ejecución de la prueba
 * la verificación no detendrá la ejecución de la prueba simplemente
 * almacenan si la prueba se pasó o falló
 */

export default function () {
  let response = http.get("https://run.mocky.io/v3/852a05f3-de78-492e-b8a7-4f373138bae2");
  console.log("RESPONSE: ", response);
  console.log("RESPONSE BODY: ", response.body);
  console.log(`response body length ${response.body.length} for VU= ${__VU} ITERA = ${__ITER}`); // Virtual user number

  /**
   * su estado de respuesta es 200 :
   * checks.....................: 100.00% ✓ 1   ✗ 0
   *   El success rate(Tasa de éxito) es del 100%:
   *   todas las veces que la API devuelve 200, no hay fallas...
   */

  const checks = check(response, {
    "is response status is 404 :": (r) => r.status === 404,
    // 'body size is 43 bytes :' : (r) => r.body.length == 43,
  });

  let body = JSON.parse(response.body);
  body.data.forEach((element) => {
    console.log(`Element ID: ${element.id}`);
  });
}

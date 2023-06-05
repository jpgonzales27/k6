import { check } from "k6";
import http from "k6/http";

export const options = {
  vus: 2,
  duration: "10s",
};

/**
 * Las checks son assertsiones, pero no detienen la ejecución de la prueba
 * la verificación no detendrá la ejecución de la prueba simplemente
 * almacenan si la prueba se pasó o falló
 */

export default function () {
  let response = http.get("https://run.mocky.io/v3/852a05f3-de78-492e-b8a7-4f373138bae2");

  console.log(`response body length ${response.body.length} for VU= ${__VU} ITERA = ${__ITER}`);

  const checks = check(response, {
    "is response status is 404 :": (r) => r.status === 404,
    // 'body size is 43 bytes :' : (r) => r.body.length == 43,
  });

  let body = JSON.parse(response.body);
  body.data.forEach((element) => {
    console.log(`Element ID: ${element.id}`);
  });
}

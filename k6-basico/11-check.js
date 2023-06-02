import { check } from "k6";
import http from "k6/http";

/**
 * checks validad condiciones boolenas en el test para
 * validad que el sistema responde con el contenido esperado
 * Validaciones de nuestras metricas
 *
 * no rompen el test pese a fallar esperaran que el test termine
 */

export const options = {
  vus: 20,
  duration: "20s",
};

export default function () {
  const response = http.get("https://api.escuelajs.co/api/v1/products");
  check(response, {
    "statusCode should be 200": (r) => r.status === 200,
  });

  const badResponse = http.get("https://api.escuelajs.co/api/v1/products/300");
  check(badResponse, {
    "statusCode should be 200": (r) => r.status === 200,
  });
}

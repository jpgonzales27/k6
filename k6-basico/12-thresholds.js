import { check } from "k6";
import http from "k6/http";

/**
 * thresholds : criterios de aprobacion/rechazo que se define para nuestros tests
 * si el rendimiento del sistema no cumple con el threshold la prueba finaliza como fallida
 *
 * Valor que rompen nuestros test si se alcanza
 *
 * podemos validar antes de completar el test en un tiempo especifico
 */

export const options = {
  vus: 20,
  duration: "20s",
  thresholds: {
    http_req_failed: ["rate<=0.5"],
  },
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

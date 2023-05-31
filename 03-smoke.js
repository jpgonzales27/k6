import http from "k6/http";

/**
 * Smoke tests (Prueba de humo) - Pocos usuarioas y pocas requests
 *
 * verifica que el sistema pueda manejar una carga minima sin ningun problema
 */

export const options = {
  vus: 1,
  duration: "1m",
};

export default function () {
  let response = http.get("https://api.escuelajs.co/api/v1/products");
}

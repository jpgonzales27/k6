import { check } from "k6";
import http from "k6/http";
import { Trend, Rate } from "k6/metrics";

// exporta la variable que usaremos en la prueba
export let errorRate = new Rate("errors");

/**
 * La tasa de falla debe ser inferior al 10%
 *
 * se permite menos del 10 % de solicitudes fallidas; de lo contrario,
 * falle las pruebas de carga
 */

export let options = {
  thresholds: {
    errors: ["rate<0.1"], // solo el 10% de error esta permitido
  },
};

export default function () {
  let response = http.get("https://run.mocky.io/v3/852a05f3-de78-492e-b8a7-4f373138bae2");

  const check1 = check(response, {
    "is response status should be 200 :": (r) => r.status === 200,
  });

  /**
   * Por qué aplicamos el operador no
   * cuando una de las comprobaciones falla dentro de la llamada check() falla,
   * check() devuelve falso
   *
   * por lo tanto, agregamos NOT, es decir, !true
   */
  errorRate.add(!check1);

  const check2 = check(response, {
    "body size is 12 bytes :": (r) => r.body.length == 12,
  });
  errorRate.add(!check2);
}

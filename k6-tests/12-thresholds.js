import http from "k6/http";
import { Rate } from "k6/metrics";

/**
 * Threashod  define los criterios de aprobación/rechazo de las pruebas
 *
 * EJEMPLO
 * El sistema no produce más del 1% de errores
 * El tiempo de respuesta para el 95 % de las API/solicitudes debe ser inferior a 200 milisegundos
 * El tiempo de respuesta para el 99 % de las solicitudes debe ser inferior a 400 milisegundos
 */

const failureRate = new Rate("failed_requests");

/**
 * failed requests............: 0.00%  ✓ 0   ✗ 1 --  NO FAILURE
 * Todos los requisitos a continuación satisfechos
 */
export let options = {
  threasholds: {
    /**
     * Definir requisitos
     */
    failed_requests: ["rate<0.1"],
    http_req_duration: ["p(95)<001", "p(99)<001"],
    /**
     * por qué http_req_duration /// las repeticiones uno deben ser menos de 1 milisegundo
     * solicitudes fallidas............: 0.00% ✓ 0 ✗ 585 -- todas las solicitudes fallaron porque
     * especificamos criterios como respuesta debe ser menos de 1 milisegundo
     * así es como puede decidir si la prueba se pasa o falla
     */
  },
};

export default function () {
  let res = http.get("https://run.mocky.io/v3/983af971-096a-4108-b262-d13ce7f46f47");

  // Aplicamos el threasholdss
  failureRate.add(res.status !== 200);
}

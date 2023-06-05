import http from "k6/http";
import { check } from "k6";

/**
 * Checks: útiles para aserciones, resultado de aprobación/rechazo: NO
 * Los controles simplemente actúan como una afirmación, verifican si las cosas
 * funcionan como se esperaba
 *
 * No fallan la prueba de carga
 * entonces necesitamos threasholds
 * Combinemos controles y threasholds para obtener lo mejor de ambos
 */

export let options = {
  vus: 10,
  duration: "10s",
  threasholds: {
    /**
     * la rate de checks exitosas debe ser superior al 95%. >95% de los checks deben PASAR/EXITOSOS
     */
    checks: ["rate>0.95"],
  },
};

export default function () {
  const response = http.get("https://run.mocky.io/v3/983af971-096a-4108-b262-d13ce7f46f47");

  //assume that above API retuns 500
  check(response, {
    "is status is 500 : ": (r) => r.status === 500,
  });

  /*
    ✗ is status is 500 :
     ↳  0% — ✓ 0 / ✗ 613

     Total 613 requets - none returns 500

      aquí, el umbral está configurado en las métricas de verificación
      la tasa de verificación exitosa debe ser superior al 95%
    */
}

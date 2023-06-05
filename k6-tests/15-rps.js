import http from "k6/http";

export default function () {
  http.get("https://run.mocky.io/v3/983af971-096a-4108-b262-d13ce7f46f47");
}

/**
 * Tantas veces, necesita tomar el control de la cantidad de solicitudes
 * entonces usaremos
 *   --rps
 * es decir, tasa por segundo tasa de solicitud por segundo
 *
 * k6 ejecuta ./tests/15-rps.js --vus 5 --duration 5s --rps 5
 * ¿Cuántas solicitudes se llaman?
 * rps = 5, duración = 5
 * 5 * 5 = 25 solicitudes
 * iteraciones..................: 25 4.998545/s
 * iteraciones..................: 25 4.999269/s
 */

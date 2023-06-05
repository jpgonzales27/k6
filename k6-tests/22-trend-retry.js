import { Counter, Trend } from "k6/metrics";
import http from "k6/http";
import { sleep } from "k6";

var retryCounter = new Counter("GetAPI_MAX_RETRY");
var retryTrend = new Trend("GETAPI_MAX_RETRY_TREND");

/**
 * Trend es para Timings, pero aquí solo nos estamos desviando para descubrir MAX reintento
 */

export default function () {
  var maxAttempts = 5;
  retryCounter.add(1);
  for (var retries = 5; retries > 0; retries--) {
    var numberOfAttempts = maxAttempts - retries + 1;
    retryTrend.add(numberOfAttempts);
    const response = http.get("https://run.mocky.io/v3/8285c1bb-5d50-481e-bdc0-4115bebcfb9e");

    if (response.status !== 404) {
      retryCounter.add(1);
      console.log(
        `response is not correct. attempt number is ${numberOfAttempts} VU=${__VU} ITER=${__ITER} sleeping for 1 seconds`
      );
      /**
       * así que tenemos que volver a intentarlo cada 1 segundo
       */
      sleep(1);
    } else {
      /**
       * la respuesta es correcta, por lo que no es necesario llamar al ciclo
       */
      retries == 0;
    }
  }
}
/**
 *  GETAPI_MAX_RETRY_TREND.....: promedio=3 min=1 med=3 max=5 p(90)=5 p(95)=5
 *  Así que aquí ignore avg, med, 90, 95 percentil
 *
 * max = 5 significa que al menos algunos de los usuarios el máximo de asistencia es 5
 * significa que GET API no devuelve una respuesta válida en 5 segundos
 * El código ha reintentado un máximo de 5 veces cada 1 segundo
 * puede mostrar dichos datos/registros a los desarrolladores y registrar defectos
 */

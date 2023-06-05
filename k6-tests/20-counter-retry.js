import { Counter, Trend } from "k6/metrics";
import http from "k6/http";
import { sleep } from "k6";

var retryCounter = new Counter("GetAPI_MAX_RETRY");
var retryTrend = new Trend("GETAPI_MAX_RETRY_TREND");

// Trend es para Timings, pero aquí solo nos estamos desviando para descubrir MAX reintento

export default function () {
  /**
   * digamos que llamas a la API utilizada en tu proyecto
   * OBTENER API = http://yourapinaname/api/v4/getUsers
   * Ahora, es posible que esta API no le proporcione una respuesta dentro de 1 segundo,
   * seguramente tomará tiempo
   *
   * Requisito: verificar cuando la API anterior vuelve, digamos 200
   * Entonces decides llamar arriba GET API
   *
   *      si respuesta.estado != 200
   *      luego espera 1 segundo
   *      y llamar arriba GET API
   *
   * haz esto por MAX 5 veces
   * Eso es volver a intentar llamar a la API GET de arriba después de cada 1 segundo
   * por MAX 5 veces hasta obtienes el código de estado como 200
   * Entonces, aquí, puede agregar un contador para averiguar el máximo
   * cuando ha devuelto 200 respuestas
   *
   *      no sea que verifique el ejemplo en la próxima sesión
   */

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
      /**
       * así es como puedes usar el contador
       * es solo una de las formas y ejemplos de usar contador para registrar intentos
       * PERO, este no es un ejemplo perfecto, para múltiples usuarios fallará
       * El contador es GLOBAL y no por VU
       * GetAPI_MAX_RETRY.......: 12 1.761654/s - ES GLOBAL, por lo que no puede usar Counter aquí
       * Entonces, lo que necesita, puede usar Trend aquí
       * */
    }
  }
}

import { check } from "k6";
import http from "k6/http";
import { Trend, Rate } from "k6/metrics";

// exporta la variable que usaremos en la prueba
export let errorRate = new Rate("errors");

var getApiTrend = new Trend("TREND_Get_Api_Duration");
var getApiTrendWaiting = new Trend("TREND_Get_Api_Waiting");
var googleGetApiTrend = new Trend("TREND_Google_Get_Api_Duration");
var googleGetApiTrendWaiting = new Trend("TREND_Google_Get_Api_Waiting");

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
  errorRate.add(!check1);

  const check2 = check(response, {
    "body size is 12 bytes :": (r) => r.body.length == 12,
  });
  errorRate.add(!check2);
  /**
   * duración de la respuesta agregada dentro de la tendencia personalizada
   * http_req_duration..........: avg=146.61ms min=146.61ms med=146.61ms max=146.61ms p(90)=146.61ms p(95)=146.61ms
   * TREND_Get_Api_Duration.....: avg=146.6175 min=146.6175 med=146.6175 max=146.6175 p(90)=146.6175 p(95)=146.6175
   *
   * ambos son lo mismo
   * magine que en un flujo de trabajo, cuando prueba varias API dentro de archivos de secuencia de
   * comandos de prueba única, entonces necesita la tendencia para averiguar la respuesta de la API individual
   * La duración de HTTP le proporcionará respuestas acumulativas
   */
  getApiTrend.add(response.timings.duration);
  getApiTrendWaiting.add(response.timings.waiting);

  /**
   * usamos ===, así que junto con 200, también verifica el tipo de datos, es decir, número ===
   * número, cadena === cadena.
   * el tipo de datos esperado y real, así como el valor, debe ser el mismo
   * Vamos a escupir chequear en 2 y verificar la tasa de error
   * agreguemos una API más
   */
  const googleResponse = http.get("https://www.google.com/");
  googleGetApiTrend.add(googleResponse.timings.duration);
  googleGetApiTrendWaiting.add(googleResponse.duration.waiting);
}

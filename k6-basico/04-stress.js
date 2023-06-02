import { sleep } from "k6";
import http from "k6/http";

/**
 * Stress test (Prueba de estres) - Maxima capacidad de usuarios y de requests
 *
 * Evalua los limites de el sistema y la estabilidad en condiciones extremas
 */

export const options = {
  stages: [
    {
      duration: "2m",
      target: 100,
    },
    {
      duration: "2m",
      target: 100,
    },
    {
      duration: "3m",
      target: 400,
    },
  ],
};

export default function () {
  let response = http.get("https://api.escuelajs.co/api/v1/products");
  /**
   * El sleep es el espacio en segundos que le das a los VUs para que realicen un nuevo request
   */
  sleep(1);
}

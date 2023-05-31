import { sleep } from "k6";
import http from "k6/http";

/**
 * Spike test (Prueba de Pico) - Incremento repentido de usuarios y de requests
 *
 * Evalua los limites de el sistema y la estabilidad en condiciones extremas
 */

export const options = {
  stages: [
    {
      duration: "10s",
      target: 10,
    },
    {
      duration: "1m",
      target: 200,
    },
  ],
};

export default function () {
  let response = http.get("https://api.escuelajs.co/api/v1/products");
}

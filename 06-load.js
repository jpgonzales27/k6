import { sleep } from "k6";
import http from "k6/http";

/**
 * load test (Prueba de carga) - Muchos usuarios y spikes esporadicos
 *
 * Evalua el rendimiento de el sistema en terminos de usuarios concurrentes
 * o solicitudes por segundo
 */

export const options = {
  stages: [
    {
      duration: "3m",
      target: 100,
    },
    {
      duration: "5m",
      target: 100,
    },
    {
      duration: "45s",
      target: 150,
    },
    {
      duration: "45s",
      target: 100,
    },
    {
      duration: "5m",
      target: 100,
    },
  ],
};

export default function () {
  let response = http.get("https://api.escuelajs.co/api/v1/products");
}

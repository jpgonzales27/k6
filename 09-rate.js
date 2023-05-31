import http from "k6/http";
import { Rate } from "k6/metrics";

/**
 * Guarda el porcentaje de los valores que no sean cero
 *
 * ejemplo si tenemos 3 valores 0,15,65 el resultado sera que
 * 66% es el pocentaje de los valores que no son cero
 */

export const options = {
  vus: 100,
  duration: "30s",
};

const myRate = new Rate("called_products");

export default function () {
  const request = http.get("https://api.escuelajs.co/api/v1/products/11");
  myRate.add(1);
  myRate.add(3);
  const request404 = http.get("https://api.escuelajs.co/api/v1/products/300");
  if (request404.status === 400) {
    myRate.add(0);
  }
}

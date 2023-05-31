import http from "k6/http";
import { Rate, Trend } from "k6/metrics";

/**
 * Devuelve valores estadisticos y guarda
 *
 * - valor minimo y maximo
 * - promedio y media
 * - percentiles 90 y 95
 *
 */

export const options = {
  vus: 100,
  duration: "30s",
};

const myTrend = new Trend("users_time");
const mySecondTrend = new Trend("categories_time");

export default function () {
  const userRequest = http.get("https://api.escuelajs.co/api/v1/users");
  myTrend.add(userRequest.timings.duration);
  const categoriesRequest = http.get("https://api.escuelajs.co/api/v1/categories");
  mySecondTrend.add(categoriesRequest.timings.duration);
}

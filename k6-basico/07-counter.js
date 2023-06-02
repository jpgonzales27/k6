import http from "k6/http";
import { Counter } from "k6/metrics";

/**
 * Counter Metric - Guardamos un valor de forma acumulativa
 *
 * podemos tener la cantiad de counter metrics que queramos
 */

export const options = {
  vus: 10,
  duration: "20s",
};

const productCounter = new Counter("called_products");
const categoriesCounter = new Counter("called_categories");

export default function () {
  let products = http.get("https://api.escuelajs.co/api/v1/products");
  productCounter.add(1);

  let categories = http.get("https://api.escuelajs.co/api/v1/categories");
  categoriesCounter.add(1);
}

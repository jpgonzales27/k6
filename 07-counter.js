import http from "k6/http";
import { Counter } from "k6/metrics";

export const options = {
  vus: 10,
  duration: "20s",
};

const productCounter = new Counter("called_products");
const categoriesCounter = new Counter("called_categories");

export default function () {
  let response = http.get("https://api.escuelajs.co/api/v1/products");
  productCounter.add(1);

  let categories = http.get("https://api.escuelajs.co/api/v1/categories");
  categoriesCounter.add(1);
}

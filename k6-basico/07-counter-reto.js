import http from "k6/http";
import { Counter } from "k6/metrics";

export const options = {
  vus: 10,
  duration: "20s",
};

const productsCallCounter = new Counter("products_call_counter");
const categoriesCallCounter = new Counter("categories_call_counter");
const usersCallCounter = new Counter("users_call_counter");

export default function () {
  const randomEndpoint = random(0, 2); // Return random value between 0 and 2
  let selectedEndpoint;

  switch (randomEndpoint) {
    case 0:
      selectedEndpoint = "products";
      productsCallCounter.add(1);
      break;

    case 1:
      selectedEndpoint = "categories";
      categoriesCallCounter.add(1);
      break;

    case 2:
      selectedEndpoint = "users";
      usersCallCounter.add(1);
      break;
  }

  const response = http.get("https://api.escuelajs.co/api/v1/" + selectedEndpoint);
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

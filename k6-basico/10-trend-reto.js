import http from 'k6/http';
import { Trend } from 'k6/metrics';

export const options = {
  vus: 10,
  duration: '20s'
}

const productsCalled = new Trend("products_called");
const categoriesCalled = new Trend("categories_called");
const usersCalled = new Trend("users_called");

export default function(){
  const randomEndpoint = random(0, 2);// Return random value between 0 and 2
  let selectedEndpoint;

  switch(randomEndpoint){
    case 0:
      selectedEndpoint = "products";
      productsCalled.add(1);
      categoriesCalled.add(0);
      usersCalled.add(0);
      break;

    case 1:
      selectedEndpoint = "categories";
      productsCalled.add(0);
      categoriesCalled.add(1);
      usersCalled.add(0);
      break;

    case 2:
      selectedEndpoint = "users";
      productsCalled.add(0);
      categoriesCalled.add(0);
      usersCalled.add(1);
      break;
  }

  const response = http.get("https://api.escuelajs.co/api/v1/" + selectedEndpoint);
}

function random(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min);
}
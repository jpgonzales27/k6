// Importar los módulos necesarios de k6
import http from "k6/http";
import { Counter } from "k6/metrics";
import { check } from "k6";

// Definir las opciones de configuración para la prueba
export const options = {
  vus: 10, // Número de usuarios virtuales
  duration: "20s", // Duración de la prueba
};

// Definir contadores para cada endpoint
const productsCallCounter = new Counter("products_call_counter");
const categoriesCallCounter = new Counter("categories_call_counter");
const usersCallCounter = new Counter("users_call_counter");

// Función principal de la prueba
export default function testEcommerceAPI() {
  // Seleccionar aleatoriamente un endpoint de la API
  const randomEndpoint = random(0, 2);
  let selectedEndpoint;

  switch (randomEndpoint) {
    // Endpoint "products"
    case 0:
      selectedEndpoint = "products";
      productsCallCounter.add(1);
      break;

    // Endpoint "categories"
    case 1:
      selectedEndpoint = "categories";
      categoriesCallCounter.add(1);
      break;

    // Endpoint "users"
    case 2:
      selectedEndpoint = "users";
      usersCallCounter.add(1);
      break;
  }

  // Enviar una solicitud GET a la API con el endpoint seleccionado
  const response = http.get(`https://api.escuelajs.co/api/v1/${selectedEndpoint}`);

  // Verificar la validez de la respuesta
  check(response, {
    "status is 200": (r) => r.status === 200, // Estado 200
    "has expected properties": (r) => r.json().hasOwnProperty("data"), // Contiene la propiedad "data"
  });

  // Obtener la duración y el tamaño del cuerpo de la respuesta
  const responseBodySize = response.body.length;
  const responseTime = response.timings.duration;

  // Imprimir información sobre la respuesta en la consola
  console.log(`Endpoint: ${selectedEndpoint} - Response size: ${responseBodySize} - Response time: ${responseTime}`);
}

// Función auxiliar para generar un número aleatorio en un rango específico
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

import http from 'k6/http'; // Importa el módulo http de K6 para hacer peticiones HTTP
import { Trend } from 'k6/metrics'; // Importa el módulo Trend de K6 para registrar métricas

export const options = { // Configura las opciones de la prueba
  vus: 10, // Especifica el número de usuarios virtuales concurrentes que realizarán la prueba
  duration: '20s' // Especifica la duración de la prueba
}

const products = new Trend('products'); // Crea un objeto de tipo Trend para registrar la cantidad de solicitudes realizadas para productos
const category = new Trend('categories'); // Crea un objeto de tipo Trend para registrar la cantidad de solicitudes realizadas para categorías
const users = new Trend('users'); // Crea un objeto de tipo Trend para registrar la cantidad de solicitudes realizadas para usuarios

export default function testEcommerceAPI() { // Define la función principal que realizará la prueba

  const randomEndpoint = random(0, 2); // Genera un número aleatorio entre 0 y 2 para elegir un endpoint aleatorio
  let endpoint; // Declara una variable para almacenar el endpoint elegido

  switch (randomEndpoint) { // Usa una estructura switch para asignar el endpoint elegido y registrar la solicitud correspondiente en las métricas

    case 0: // Si se elige el endpoint 0
      endpoint = 'products'; // Asigna el valor 'products' a la variable endpoint
      products.add(1); // Registra una solicitud para productos en las métricas
      category.add(0); // Registra una solicitud para categorías en las métricas
      users.add(0); // Registra una solicitud para usuarios en las métricas
      break;

    case 1: // Si se elige el endpoint 1
      endpoint = 'categories'; // Asigna el valor 'categories' a la variable endpoint
      products.add(0); // Registra una solicitud para productos en las métricas
      category.add(1); // Registra una solicitud para categorías en las métricas
      users.add(0); // Registra una solicitud para usuarios en las métricas
      break;

    case 2: // Si se elige el endpoint 2
      endpoint = 'users'; // Asigna el valor 'users' a la variable endpoint
      products.add(0); // Registra una solicitud para productos en las métricas
      category.add(0); // Registra una solicitud para categorías en las métricas
      users.add(1); // Registra una solicitud para usuarios en las métricas
      break;

    default: // Si no se elige ningún endpoint
      break;
  }

  console.log(`Endpoint: ${endpoint}`); // Imprime el endpoint elegido en la consola

  function random(min, max) { // Define una función que genera un número aleatorio entre un rango dado
    return Math.floor((Math.random() * (max - min + 1)) + min);
  }
}
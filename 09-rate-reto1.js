import http from 'k6/http'; // importa el módulo HTTP de K6 para hacer peticiones
import { Rate } from 'k6/metrics'; // importa el módulo Metrics de K6 para manejar métricas de pruebas

export const options = {
  vus: 10, // número de usuarios virtuales que simularán la carga en la aplicación
  duration: '20s' // tiempo total de ejecución de la prueba
}

const myRate = new Rate('called_products'); // instancia un objeto de tipo Rate con nombre 'called_products'

const random = (min, max) => { // función que genera un número aleatorio en un rango dado
  return Math.floor(Math.random() * (max - min)) + min;
}

export default function testEcommerceAPI() {

  const random_product = random(1, 300); // llama a la función random para obtener un número aleatorio entre 1 y 300

  // realiza una petición GET a la API con el número aleatorio generado
  const request = http.get(`https://api.escuelajs.co/api/v1/products/${random_product}`);

  // si el estado de la respuesta es 400, agrega un valor de 0 a la métrica 'called_products', de lo contrario agrega 1
  request.status === 400 ? myRate.add(0) : myRate.add(1);
}

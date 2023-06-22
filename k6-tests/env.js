/*
declarar variables de entorno - URL, int dev pro

Nuestro moodle está alojado en http://127.0.0.1:83

La URL del servicio principal es http://127.0.0.1:83/webservice/rest/server.php

*/

//distintas url de los diferentes ambientes
var SERVER_INT_URL = "http://127.0.0.1:83/webservice/rest/server.php";
var SERVER_DEV_URL = "http://127.0.0.1:84/webservice/rest/server.php"; // ASSUME dev hosted on 84
var SERVER_PROD_URL = "http://www.moodle.com/webservice/rest/server.php";

// exportar variables para que pueda usarse en otros archivos JS
export let intEnvironment = {
  SERVER_ENDPOINT: SERVER_INT_URL,
};

// URL DEV QUE SE PUEDE UTILIZAR DENTRO DE OTROS ARCHIVOS JS
export let devEnvironment = {
  SERVER_ENDPOINT: SERVER_DEV_URL,
};

// URL de producción
export let prodEnvironment = {
  SERVER_ENDPOINT: SERVER_PROD_URL,
};

// Ahora para no declarar tipos de entorno
export let int = "int";
export let dev = "dev";
export let prod = "prod";

/**
 * entonces declaramos env.sh y env.js
 * informacion delicada
 * datos fácilmente configurables en tiempo de ejecución
 * int/dev/prod/prod-int - tipos de URL/puntos finales
 */

// lots of errros... but no logs inside console... so how to resolve this ....

/**
 * Qué todas las cosas verificaremos / mediremos
 *
 * Checks - response 200, verifique cualquier parámetro de la respuesta HTTP
 * Rate - verificar la tasa de fallas de las API
 * Deine Trend - tiempos de duración de HTTP REQ de API
 */

import { check, fail } from "k6";
import { Rate } from "k6/metrics";
import http from "k6/http";
import { Trend } from "k6/metrics";

// Check Failure Rate (tasa de fallas) or Error Rate (tasa de error))
let failureRate = new Rate("failure_rate");

// define trends - probaremos crear curso, obtener curso y eliminar curso ... asi que 3 trends
var createCourseTrend = new Trend("Trend_CreateCourse");
var getCourseTrend = new Trend("Trend_GetCourse");
var deleteCourseTrend = new Trend("Trend_DeleteCourse");

/**
 * logging function
 */
export function logger(endPoint, token, response) {
  console.log(`Logger Started VU=${__VU} ITER=${__ITER}`);
  console.log(`Endpoint is ${endPoint} Token is ${token} VU=${__VU} ITER=${__ITER}`);
  console.log(`Response Status is ${response.status} VU=${__VU} ITER=${__ITER}`);
  console.log(`Body is ${JSON.stringify(JSON.parse(response.body))}`);

  try {
    /**
     * agregar correlation id
     */
    console.log(`Correlation Id is ${JSON.stringify(JSOn.parse(response.headers))["X-Correlation-Id"]}`);
  } catch (ex) {}
}

/**
 * El formato de solicitudes de Moodle es application/x-www-form-urlencoded
 */
export const setHeader = () => {
  return {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
};

function generateRandomString(length) {
  var chars =
    "asbyqwasdasdkadjqwueu17364748kadsadsjd12345678909sdiuqweyqehqwehwqehweethvnmxcpasksookl123456789lsdfokaj";
  var results;
  for (var i = length; i > 0; --i) {
    results += chars[Math.floor(Math.random() * chars.length)];
  }

  return results;
}

/**
 * declarmos una const para la URL create course
 *
 * {{courseURL}}?wstoken=585a5e34abe199537fec2640b8252ef7&moodlewsrestformat=json&wsfunction=core_course_create_courses&courses[0][fullname]=mycourses&courses[0][shortname]=mycourses123&courses[0][categoryid]=1&courses[0][visible]=1&courses[0][summary]=text&courses[0][enablecompletion]=0&courses[0][summaryformat]=1&courses[0][format]=topics&courses[0][numsections]=0
 */
export const route_createCourse = (endPoint, token) =>
  `${endPoint}?wstoken=${token}&moodlewsrestformat=json&wsfunction=core_course_create_courses&courses[0][fullname]=mycourses&courses[0][shortname]=${generateRandomString(
    15
  )}&courses[0][categoryid]=1&courses[0][visible]=1&courses[0][summary]=text&courses[0][enablecompletion]=0&courses[0][summaryformat]=1&courses[0][format]=topics&courses[0][numsections]=0`;

/**
 *  declarmos una const para la URL get course
 *
 * http://127.0.0.1:83/webservice/rest/server.php?wstoken=585a5e34abe199537fec2640b8252ef7&wsfunction=core_course_get_courses&options[ids][0]=11&moodlewsrestformat=json
 */
export const route_getCourse = (endPoint, token, courseId) =>
  `${endPoint}?wstoken=${token}&wsfunction=core_course_get_courses&options[ids][0]=${courseId}&moodlewsrestformat=json`;

/**
 *  declarmos una const para la URL delete course
 *
 * {{courseURL}}?wstoken=585a5e34abe199537fec2640b8252ef7&moodlewsrestformat=json&wsfunction=core_course_delete_courses&courseids[0]={{courseId}}
 */
export const route_deleteCourse = (endPoint, token, courseId) =>
  `${endPoint}?wstoken=${token}&moodlewsrestformat=json&wsfunction=core_course_delete_courses&courseids[0]=${courseId}`;

/**
 * POST Create Course
 *
 * iniciar sesión (sign in) - necesitamos token, URL
 */
export function createCourse(endPoint, token) {
  console.log(`Inside createCourse token=${token}`);
  /**
   * crear curso: significa post, por lo que también necesita estos datos del equipo de desarrollo,
   * ya sea que la llamada sea POST, GET, UPDATE, DELETE, PATCH
   * header - acepta JSON
   *
   * http.post(url,body,header)
   */
  let postResponse = http.post(`${route_createCourse(endPoint, token)}`, null, setHeader());
  /**
   * agregamos un trend
   */
  createCourseTrend.add(postResponse.timings.duration);
  /**
   * Definimos check for status code 200 - resposne code  = 200
   */
  let checkPostResponse = check(postResponse, {
    "Create Course status 200 : ": (r) => r.status === 200,
  });
  /**
   * Ahora defina Error Rate (tasa de error)
   */
  failureRate.add(!checkPostResponse);

  /**
   * add Logs
   */
  logger(endPoint, token, postResponse);

  /**
   * Ahora definimos como leer el response
   */
  let responseBody = JSON.parse(postResponse.body);
  /**
   * returns un array que contiene el id
   *
   * esta línea puede generar una excepción si ocurre algún error en el código
   * o si hay un defecto, por lo que también debemos realizar un seguimiento
   * de esto en la tasa de verificación y error
   */
  try {
    var id = responseBody[0].id;
    console.log(`Create Course returns body as ${JSON.stringify(responseBody)}`);
    console.log(`course id is ${id}`);
    if (`${responseBody[0].id}` == "undefined") {
      checkPostResponse = check(postResponse, {
        /**
         * agregue cualquier valor inválido aquí
         */
        "Create Course returns Undefined Id ": (r) => r.status === 999,
      });
      failureRate.add(!checkPostResponse);
    }
  } catch (ex) {
    /**
     * aquí necesitamos agregar el check
     * en caso de excepción, el usuario debe ver un registro en la consola K6
     */
    checkPostResponse = check(postResponse, {
      /**
       * proporcione cualquier Id no válido, de modo que Create Course
       * no devuelva un mensaje de datos válido que pueda verse en la consola
       * K6 como un error
       */
      "Create Course does not return valid data ": (r) => r.status === 999,
    });
    failureRate.add(!checkPostResponse);
  }
  return responseBody;
}

/**
 * GET Course API
 *
 * http.get(url,body)
 */
export function getCourse(endPoint, token, courseId) {
  const getResponse = http.get(`${route_getCourse(endPoint, token, courseId)}`, null);
  /**
   * agregamos un check
   */
  var checkGetResponse = check(getResponse, {
    "Get Course status is 200 ": (r) => r.status === 200,
  });
  /**
   * agregamos un error rate (tasa de error)
   */
  failureRate.add(!checkGetResponse);
  /**
   * agregamos un trend
   */
  getCourseTrend.add(getResponse.timings.duration);

  /**
   * read Body, returns un array del curso con su Id.
   * [{id:20}] - este puede no ser un formato válido o Puede ser {[id:20], [id:21]}
   */
  let getResponseBody = JSON.parse(getResponse.body);

  /**
   * add Logs
   */
  logger(endPoint, token, getResponse);

  /**
   * vamos a registrar id
   * en caso de que no se encuentre la identificación
   */
  try {
    /**
     * Ahora aquí,el id del curso puede no estar undefined si el id del curso no está definida,
     * necesitamos registrar esto dentro de los registros de K6
     *
     * o en otro caso el id existe dentro de la matriz pero el valor no está definido
     */
    if (`${getResponseBody[0].id}` == "undefined") {
      checkGetResponse = check(getResponse, {
        "Get Course returns Undefined Id ": (r) => r.status === 999,
      });
      failureRate.add(!checkGetResponse);
    }
    console.log(`get course body is ${JSON.stringify(getResponseBody)}`);
    console.log(`course id is ${getResponseBody[0].id}`);
  } catch (ex) {
    checkGetResponse = check(getResponse, {
      "Get Course does not return valid data ": (r) => r.status === 999,
    });
    failureRate.add(!checkGetResponse);
  }

  /**
   * return response body
   */
  return getResponseBody;
}

/**
 * DELETE course Api
 *
 * http.del(url,body,header)
 */
export function deleteCourse(endPoint, token, courseId) {
  console.log(`Inside delete course. course id is ${courseId}`);

  /**
   * Obtenemos el response
   */
  let deleteResponse = http.del(`${route_deleteCourse(endPoint, token, courseId)}`, null, setHeader());
  /**
   *  add Logs
   */
  logger(endPoint, token, deleteResponse);

  /**
   * agregamos un check
   */
  var checkDeleteResponse = check(deleteResponse, {
    "Delete Course status 200 ": (r) => r.status === 200,
  });
  /**
   * define error rate(taza de error)
   */
  failureRate.add(!checkDeleteResponse);
  /**
   * medimos el trend - tiempo de respuesta de http
   */
  deleteCourseTrend.add(deleteResponse.timings.duration);
}

/*
Create Course
Get Course
Delete Copurse


Edit Couse
GetAll Courses

*/

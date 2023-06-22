/**
 * * Paso 1 - Declare import - import * from
 */

import * as courseService from "../utility/courseService.js";
// necesitamos datos de prueba; decidamos esto más tarde

import * as testData from "../testdata/testData.js";

// necesitamos variables env, es decir, env.js
import * as env from "../../env.js";

/**
 * Paso 2 - Options - VU
 * Env variables
 *
 * usando
 * virtual user que defininos desde testData
 * duracion del test que defininos desde testData
 */

export let options = {
  vus: testData.VUS,
  duration: testData.DURATION,
  /**
   * teardownTimeout: si hay una función de desmontaje (teardown function), puede ir a un bucle
   * infinito debido a problemas o errores de codificación, por lo que aquí define el tiempo máximo
   * dentro del cual debería funcionar la teardown function. En caso de fallas,
   * la función tendrá un tiempo de espera
   */
  teardownTimeout: "20s",
};

/**
 * Otra opcion seria usando directo el env.sh
 *
 * pero mejor colocar estas variable en el testData y usarlas aqui directamente
 * como la opcion de arriba
 */
export let options1 = {
  vus: `${__ENV.VUS}`,
  duration: `${__ENV.DURATION}`,
  teardownTimeout: "20s",
};

/**
 * 3 - Test Life Cycle - Init - Inicialización única
 *
 * si miras Moodle para Create Course, necesitamos un token
 * el token es diferente para el entorno int/dev/prod
 * URL/API/Endpoint es diferente para cada entorno
 *
 * Cada caso de prueba debe ejecutarse para todos los entornos,
 * sin ningún cambio en el código o script de prueba
 *
 * entonces el usuario debe pasar el entorno - int/dev/prod/cualquier otro
 * y según lo que ingrese el usuario, debemos elegir el token o la URL
 */

// INIT
let environment;
let token;

/**
 * necesitamos el environment
 *
 * lo mismo para prod o cualquier otro entorno
 * Ahora su variable de entorno contiene todas las URL de ese entorno
 * así es como puedes configurar el token eso es todo
 */
if (`${__ENV.ENVIRONMENT}` == env.int) {
  environment = env.intEnvironment;
  token = `${__ENV.INT_TOKEN}`;
} else if (`${__ENV.ENVIRONMENT}` == env.dev) {
  environment = env.devEnvironment;
  token = `${__ENV.DEV_TOKEN}`;
} else {
  environment = env.prodEnvironment;
  token = `${__ENV.PROD_TOKEN}`;
}

/**
 * 4 - Test Life Cycle - SetUp
 */
export function setUp() {
  /**
   * no es obligatorio crear un setup
   */
}

/**
 * 5 - Test Life Cycle - Default function - Función principal de VUS
 */
export default function () {
  try {
    /**
     * usamos nuestro course service workflow y nuestro environment que definimos previamente
     */
    console.log(`ENV -> ${environment.SERVER_ENDPOINT}`);
    /**
     * Crea el curso obtiene el response
     */
    let responseBody = courseService.createCourse(`${environment.SERVER_ENDPOINT}`, token);
    /**
     * obtiene el curso creado
     */
    courseService.getCourse(environment.SERVER_ENDPOINT, token, responseBody[0].id);
    /**
     * elimina el curso creado
     */
    courseService.deleteCourse(environment.SERVER_ENDPOINT, token, responseBody[0].id);
  } catch (ex) {
    console.log(`error occurs in execution`);
  }
}

/**
 * 6 - Test Life Cycle - teardown - CleanUp si corresponde
 */

/**
 * Ejecutar nuestro script
 *
 * LOCALMENTE
 * - declaramos env.sh - cómo configurar esto localmente ---necesitamos configurar ENV
 * - escribimos en la consola "source env.sh" y presionamos enter para establecer nuestras variables
 * - ejecutamos  k6 run ./framework/tests/course.js
 * - o  k6 run ./framework/tests/course.js --iterations 10
 *
 * Si modificas algun valor en el env.sh debes volver a correr
 * el comando "source env.sh" para aplicar los cambios
 *
 * CI/CD
 * - para un CI/CD, no necesitamos declarar nada
 */

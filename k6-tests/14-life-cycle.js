/**
 * 1 - Init
 *
 * Primero se llama a init, como sugiere el nombre, aquí puede inicializar variables,
 * definir opciones (VU, duration, Threaholds)
 *
 * solo una vez
 */
var counter = 1;

/**
 *  2- SetUp
 *
 * Llamado una vez una vez antes de que comience la prueba de carga
 */
export function setup() {
  console.log(`Inside SetUp - ${counter}`);
  return "My Name is ABCD";
}

/**
 * 3 - Default
 *
 * Es función principal. Punto de entrada para usuarios virtuales, el usuario virtual
 * sigue llamando a las API definidas aquí
 *
 * Es código VU. Se llama hasta que se ejecuta la prueba
 *
 * ¿Cuál es la default function? Punto de entrada para VU, similar a la función principal
 * Código ejecutado por VU en la función default
 * Cuando el código llega a su última declaración en la función predeterminada,
 * VU se reset/ restart
 *
 * En Restart : la VU se restablece, las cookies se borran, las conexiones TCP
 * se interrumpen según la configuración actualizada
 */
export default function (data) {
  console.log(`Inside Default - ${counter} VU=${__VU} ITER=${__ITER} DATA is ${data}`);
  counter = counter + 1; // First VU reaches here
}

/**
 * 4 - Teardown
 *
 * se llama una función predeterminada ha terminado. se llama una sola vez
 */
export function teardown(data) {
  console.log(`Inside Teardown - ${counter} DAtA is ${data}`);
}

/*
Inside Default function 

El contador sigue aumentando en la default function


Inside Teardown - 1

De esta manera, puede devolver datos desde la configuración hasta las funciones predeterminadas y de desmontaje.



Debug K6 scripts
1 - USe console.log to print results. we already use this
2 - Use --http-debug full to produce all the logs

Actually I choose wrong script, ther are no API calls
so lets select differen scrpt

*/

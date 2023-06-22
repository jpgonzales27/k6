# K6

Pruebas de rendimiento y estrés K6

## Sesión 1 - Instalación

Instalar K6
Git Crear proyecto
Proyecto de clonación local

Hecho !

## Escribir y ejecutar prueba de muestra

## Estructura

Contiene
Ambiente
Datos de prueba
Utilidad - Funciones comunes
Guiones de prueba - Guiones K6

### Ambiente

- env.sh file-create file - contiene datos confidenciales. Estos datos serán locales. Este archivo no se registrará en Git. Cada empleado del equipo tendrá env/.sh. Contiene variables y valores que pueden declararse como variables ENV dentro de CI/CD
  ¿Qué son los datos confidenciales? - Nombre de usuario, contraseña, fichas, claves secretas
  También contiene datos que se pueden configurar en tiempo de ejecución. Por ejemplo, la cantidad de usuarios virtuales: digamos que desea pasar la cantidad de usuarios en el tiempo de ejecución al script k6. Por ejemplo, k6 ejecuta --vus 10, en lugar de 10 pasa el valor de la variable Env.
  Por lo tanto, no es necesario modificar el script de prueba. Simplemente configure el valor ENV y los usuarios cambiarán

- archivo env.js - archivo env
  Supongamos que está probando google.com
  Luego, internamente en el proyecto de Google
  puede haber
  Entorno de desarrollo: http://www.google-dev.com: los desarrolladores envían código continuamente aquí
  Int Environment - http://www.google-int.com - los probadores están probando aquí, asegurándose de que no haya defectos críticos, defectos de regresión
  Entorno de producción: http://www.gogole.com: Google real que es visible para el mundo, entorno de producción

Puede haber muchos más ambientes

Así que estamos probando moodle
vamos a crear archivos

Hay 2 tipos de ambiente

#### Trend (Tendencia)

- ¿Cuál es el Trend? - Métricas personalizadas ... veamos un ejemplo

### Vamos a crear Git Pipeline

Desea ejecutar scripts K6 en Ci/CD - Git Pipeline
Entonces necesitas crear un archivo YAML
Puede programar para ejecutar Pipeline cuando lo desee
Cada vez que el desarrollador impulsó el código, puede activar su Pipeline para averiguar si su nuevo código cambia/fusiona/cambia ha introducido algún problema.

Ejecutaremos scripts de muestra desde el directorio de prueba.

Ahora no sea que verifique el código
registraremos directamente el código en la rama maestra

Para conocer las mejores prácticas del código registrado, consulte las mejores prácticas de GIT

antes de eso, veamos las variables env
si tiene que usar el archivo env.sh, entonces necesita declarar todas las variables dentro de las variables CI/CD

Así es como puede integrar scripts K6 con GIT PIPELINE

Muchas gracias

### Cambiar detalles de usuario

git config --usuario global.nombre "CtrlAltSkills Care"
git config --usuario global.email ctrlaltskills@gmail.com

### Algo de teoría -

¿Qué corredor elegir? Medio
en qué máquina debemos ejecutar la prueba de rendimiento
¿Cuál debería ser la configuración ideal de la máquina para ejecutar k6 / pruebas de rendimiento?

Evite el sistema operativo Windows - No ejecute la prueba K6 - prueba K6 real con su proyecto/API en Windows. Windows es un sistema operativo pesado

Si sus scripts de prueba contienen scripts ES5+ puros, una generación de datos muy menos dinámica, como la que está generando, también debe generar datos en el tiempo de ejecución como parte de sus scripts de prueba/casos de prueba/... Entonces, 1VPC/2 gb de RAM PODRÍA SER SUFICIENTE PARA EJECUTAR PRUEBAS CON 100 vu

PUEDES SEGUIR EL ENFOQUE SCRAE UP
Comience CON pequeño

Usar máquinas virtuales Amazon ec2
cree una VM con 1VPC, 1 GB de RAM, instale K6, ejecute la prueba con 20-50 usuarios virtuales, vea si funciona, verifique si hay algún problema de rendimiento... verifique que no haya ningún error de memoria: memoria insuficiente durante la ejecución pruebas
Los errores de memoria serán visibles en la consola K6

También puede, al iniciar sesión en la consola AW EC2, verificar el uso de la memoria y la CPU cuando se ejecutan las pruebas.

Verifique que el uso de la CPU no sea muy alto> 90%, al menos el 20% de la memoria debe permanecer libre

Lista de verificación de cajas de las cosas que verificará al seleccionar el corredor

Muchas más cosas que puede seguir mientras elige el corredor/máquina correcto para ejecutar las pruebas

Si elige una configuración incorrecta del corredor/máquina, es posible que vea una respuesta más alta, más fallas, problemas de falta de memoria

Así que elija corredor/máquina con cuidado para ejecutar los casos de prueba k6

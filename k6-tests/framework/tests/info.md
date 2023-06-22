/\*

Definir los casos de prueba principales relacionados con Course

¿Cuáles son las partes principales del script de prueba?

Create Course -{{courseURL}}?wstoken=585a5e34abe199537fec2640b8252ef7&moodlewsrestformat=json&wsfunction=core_course_create_courses&courses[0][fullname]=mycourses&courses[0][shortname]=mycourses123&courses[0][categoryid]=1&courses[0][visible]=1&courses[0][summary]=text&courses[0][enablecompletion]=0&courses[0][summaryformat]=1&courses[0][format]=topics&courses[0][numsections]=0

¿Cuál es la sección de esta API?

CourseURL - Variable de entorno

wstoken - Token - Datos confidenciales - definir dentro de la variable Env - Para Dev/Int/Prod, este token será diferente

contiene datos de prueba

contiene una función común que creará un curso para que cualquier otro script de prueba pueda usar la función común de creación de un curso

es responsabilidad de esa función que defina en el directorio de utilidades medir/registrar el rendimiento de CREATE COURSE API

Get Course
Delete Course
Lets check Postman / Dev Document

\*/

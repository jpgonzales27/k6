/\*\*

- Escribamos el Service APIs
-
- - API que deben probarse
- - Formato de la API: UTL
- - API Headers - por ejemplo token, content type is JSON / content type plain text/ html
- - Body to be passed - por ejemplo body is JSON, pasa los valores de email and password {email:abc,password:abc}
- - Resonse body - por ejemplo API retorna {message:success,id:1}
-
- Tomemos el ejemplo de la API del curso
- La API es {{courseURL}}?wstoken=585a5e34abe199537fec2640b8252ef7&moodlewsrestformat=json&wsfunction=core_course_create_courses&courses[0][fullname]=mycourses&courses[0][shortname]=mycourses123&courses[0][categoryid]=1&courses[0][visible]=1&courses[0][summary]=text&courses[0][enablecompletion]=0&courses[0][summaryformat]=1&courses[0][format]=topics&courses[0][numsections]=0
-
- - BODY - nulo, no es necesario pasar nada
- - Request Accepts - query string - pasar datos en la cadena de consulta
- - Crear curso devuelve JSON Array [{id:12}] - es el ID del curso
-
- Entonces, el primer paso es recopilar todas esas cosas.
- Se recomienda llevar documentos de desarrollador de API/documentación de API/
- Luego revise este documento para verificar su corrección.
- No continuar si el documento no es correcto o está incompleto
- No comience a codificar directamente si el documento no está completo
  \*/

import http from "k6/http";

export default function () {
  let response = http.get("https://run.mocky.io/v3/b2ef378b-5f93-421e-8406-aba4f319578f");

  /**
   * obtenemos la respuesta lo convertimos en JSON
   * para poder acceder a sus elementos con un for
   */

  let body = JSON.parse(response.body);
  body.forEach((element) => {
    console.log(`name is ${element.name}`);
  });

  /**
   * Accedemos a un array que cada elemento contiene otro array
   */
  let response1 = http.get("https://run.mocky.io/v3/a19b0ec9-5985-4064-bce0-11647d98132e");
  let body1 = JSON.parse(response1.body);
  body1.data.forEach((element) => {
    console.log(`name from data is ${element.name}`);

    element.array.forEach((elementArr) => {
      console.log(`name from data is ${elementArr}`);
    });
  });
}

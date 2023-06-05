import http from "k6/http";

export default function () {
  let response = http.get("https://run.mocky.io/v3/82e5d950-66ae-4197-9c81-c463123fbf42");

  //JSON response Body
  let body = JSON.parse(response.body);

  /**
   * el conjunto está en data
   *
   * Imprimimos el array y el array que está dentro del elemento
   */

  body.data.forEach((element) => {
    console.log(`value of name from data is ${element.name}`);

    element.array.forEach((elementArray) => {
      console.log(`value of property array is ${elementArray}`);
    });
  });
}

import http from "k6/http";
import { check } from "k6";

export default function () {
  var url = "https://run.mocky.io/v3/8285c1bb-5d50-481e-bdc0-4115bebcfb9e";

  var headerParam = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = http.get(url, headerParam);

  check(response, {
    "is status is 200: ": (r) => r.status === 200,
  });

  console.log(`respone body ${response.body}`);

  let body = JSON.parse(response.body);

  console.log(`respone parse body object ${body}`);
  console.log(`respone body is ${JSON.stringify(body)}`);
  console.log(`Message is ${body.Message}`);

  // padomoes validar la respusata dentro del check()

  check(response, {
    "is Message is Success: ": (r) => JSON.parse(r.body).Message === "Data fetched successfully",
  });
}

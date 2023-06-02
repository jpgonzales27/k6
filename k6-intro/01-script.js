import { check, sleep } from "k6";
import http from "k6/http";

export let options = {
  stages: [
    { duration: "30s", target: 30 },
    { duration: "30s", target: 30 },
    { duration: "30s", target: 60 },
    { duration: "30s", target: 0 },
  ],
};

export default function () {
  var url = "{URL}";
  var payload = JSON.stringify({
    user: "juan",
    password: "juan123",
  });

  var headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  var response = http.post(url, payload, params);
  check(response, {
    "status should be 200": (r) => r.status === 200,
  });

  console.log(response.status);
  console.log(response.body);
  sleep(1);
}

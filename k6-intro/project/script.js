import * as auth from "./resources/services/authentication";
import * as general from "./resources/services/general";
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
  var url = `${general.base_url}/${auth.url}`;
  var payload = JSON.stringify(auth.body);
  var headers = {
    headers: auth.headers,
  };

  var response = http.post(url, payload, headers);
  check(response, {
    "status should be 200": (r) => r.status === 200,
  });

  console.log(response.status);
  console.log(response.body);
  sleep(1);
}

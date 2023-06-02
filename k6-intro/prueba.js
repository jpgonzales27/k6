import http from "k6/http";
import { sleep } from "k6";
import { URLSearchParams } from "https://jslib.k6.io/url/1.0.0/index.js";

export default function () {
  // var url = "https://auth.ses-unit.com/auth/realms/meetpointtest/protocol/openid-connect/token";
  // var payload = qs.stringify({
  //   client_id: "meetpoint-webapp",
  //   grant_type: "password",
  //   username: "Automation1",
  //   password: "Automation123",
  // });

  const url = new URL("https://auth.ses-unit.com/auth/realms/meetpointtest/protocol/openid-connect/token");
  const params = new URLSearchParams({
    client_id: "meetpoint-webapp",
    grant_type: "password",
    username: "Automation1",
    password: "Automation123",
  });
  url.search = params.toString();

  http.get(url.toString());

  // var headers = {
  //   headers: {
  //     "Content-Type": "application/json",
  //     // Authorization: `Bearer ${this.token}`,
  //   },
  // };

  // var response = http.post(url, payload, headers);
  console.log(payload);
  // var response = http.post(url, payload);
  http.post(url.toString(), { headers: { "Content-Type": "application/x-www-form-urlencoded" } }, JSON.stringify(body));
  console.log(response.status);
  console.log(response.body);
  const authToken = loginRes.json("access_token");
  console.log(authToken);
  sleep(1);
}

/**
 * GET  http://127.0.0.1:5500/index.html?decir=Hola&a=mam%C3%A1#
 * POST http://127.0.0.1:5500/index.html?decir=Hola&a=mam%C3%A1#
 */

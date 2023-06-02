import * as auth_service from "../../services/authentication";
import * as type_test from "./paramatrization";
import { check, sleep } from "k6";

export let options = type_test.types[__ENV.TYPE_TEST];

export default function () {
  console.log("Tipo de prueba: ", __ENV.TYPE_TEST);
  const response = auth_service.execute();
  check(response, {
    "status should be 200": (r) => r.status === 200,
  });

  console.log(response.status);
  console.log(response.body);
  sleep(1);
}

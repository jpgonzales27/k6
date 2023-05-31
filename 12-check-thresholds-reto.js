import { check } from "k6";
import http from "k6/http";

/**
 * Devuelve valores estadisticos y guarda
 *
 */

export const options = {
  vus: 20,
  duration: "20s",
  thresholds: {
    http_req_failed: ["rate<=0.5"],
    http_req_duration: [
      {
        threshold: "p(95)<200",
        abortonFail: true,
        delayAbortEval: "10s",
      },
    ],
  },
};

export default function () {
  const response = http.get("https://api.escuelajs.co/api/v1/products/11");
  check(response, {
    "statusCode should be 200": (r) => r.status === 200,
    "transaction should less than 500ms": (r) => r.timings.duration < 500,
  });

  const badResponse = http.get("https://api.escuelajs.co/api/v1/products/300");
  check(badResponse, {
    "statusCode should be 200": (r) => r.status === 200,
  });
}

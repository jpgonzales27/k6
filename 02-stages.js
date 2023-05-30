import { sleep } from "k6";
import http from "k6/http";

// export const options = {
//   vus: 10,
//   duration: "10s",
// };

/**
 * si en un stage tenemos el mismo número de VU’s que en el anterior,
 * le estamos diciendo que los mantenga por ese tiempo.
 *
 * target = vus(Virtual Users)
 */
export const options = {
  stages: [
    {
      duration: "60s",
      target: 10,
    },
    {
      duration: "180s",
      target: 10,
    },
    {
      duration: "60s",
      target: 0,
    },
  ],
};

export default function () {
  let response = http.get("https://api.escuelajs.co/api/v1/products");
  sleep(1);
}

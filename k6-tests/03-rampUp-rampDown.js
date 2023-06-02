import http from "k6/http";

/**
 * ramp up - ramp down
 *
 * Incrementar o decrementar lo usuarios en periodos de tiempo
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
  const response = http.get("https://www.google.com");
}

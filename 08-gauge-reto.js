import http from "k6/http";
import { Gauge } from "k6/metrics";

export const options = {
  vus: 10,
  duration: "20s",
};

const gauge = new Gauge("waiting_and_sending_time");

export default function () {
  const response = http.get("https://api.escuelajs.co/api/v1/products");

  gauge.add(response.timings.waiting + response.timings.sending);
}

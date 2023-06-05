import { Counter } from "k6/metrics";
import http from "k6/http";
import { sleep } from "k6";

var myCounter = new Counter("my_counter");

export default function () {
  /**
   *   my_counter...........: 3   0/s
   *   1 + 2 = 3
   */

  myCounter.add(1);
  myCounter.add(2);

  myCounter.add(1);
  for (var retries = 5; retries > 0; retries--) {
    let response = http.get("https://run.mocky.io/v3/852a05f3-de78-492e-b8a7-4f373138bae2");
    if (response.status !== 404) {
      console.log(`response is not 200 so sleeping for 1 second . retry attempt = ${retries}`);
      myCounter.add(1);
      sleep(1);
    } else {
      retries = 0;
    }
  }
}

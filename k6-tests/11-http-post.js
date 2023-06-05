import http from "k6/http";

export default function () {
  var url = "https://run.mocky.io/v3/983af971-096a-4108-b262-d13ce7f46f47";

  var param = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //lets define body - its acepts email and password - assuem this

  var payload = JSON.stringify({
    email: "abc@gmail.com",
    password: "abcdefg",
  });

  // URL, HEADER, JSON BODY
  let response = http.post(url, param, payload);
}

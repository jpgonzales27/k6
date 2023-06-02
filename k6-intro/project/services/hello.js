import http from "k6/http";
import * as general_data from "./../resources/services/general";
import * as hello_data from "./../resources/services/hello";

export let execute = (authData) => {
  var url = `${general_data.base_url}/${hello_data.url}`;
  hello.headers["Authorization"] = authData.authResponse.token;
  return http.get(url, hello_data.headers);
};

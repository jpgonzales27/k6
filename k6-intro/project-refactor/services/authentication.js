import http from "k6/http";
import * as general_data from "./general";
import * as auth_data from "./authentication";

const HEADERS = {
  headers: auth_data.headers,
};

const BODY = auth_data.body;

export let execute = (data) => {
  return http.post(`${general_data.base_url}${auth_data.url}`, JSON.stringify(BODY), HEADERS);
};

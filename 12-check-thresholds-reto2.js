import http from "k6/http";
import { Rate } from 'k6/metrics';

export const options = {
  vus: 10,
  duration: '20s',
  thresholds: {
    http_req_failed: ["rate<0.35"],
    http_req_failed: [{
      threshold: "rate<0.35",
      abortonFail: true,
      delayAbortEval: "10s"
    }]
  }
}

const rate = new Rate("exists_product");

export default function(){
  const randomProduct = random(1, 300);// Return random value between 1 and 300
  const response = http.get("https://api.escuelajs.co/api/v1/products/" + String(randomProduct));

  // If the response status equals 400
  if(response.status === 400){
    rate.add(0);
  }
  else{
    rate.add(1);
  }
}

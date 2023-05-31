import { Rate } from 'k6/metrics';
import http from 'k6/http';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export const options = {
    vus: 10, duration: '10s'
};

const porcentOk = new Rate('products found');

export default function () {
    const number = randomIntBetween(1, 300)
    const res = http.get(`https://api.escuelajs.co/api/v1/products/${number}`);

    porcentOk.add(res.status === 200 ? 1 : 0);
}!
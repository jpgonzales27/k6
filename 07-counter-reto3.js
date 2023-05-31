import { Counter } from 'k6/metrics';
import http from 'k6/http';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export const options = {
    stages: [{ duration: '10s', target: 10 }]
};

const endpoints = [
    {
        url: 'https://api.escuelajs.co/api/v1/products',
        counter: new Counter('product calls'),
    },
    {
        url: 'https://api.escuelajs.co/api/v1/categories',
        counter: new Counter('categories calls'),
    },
    {
        url: 'https://api.escuelajs.co/api/v1/users',
        counter: new Counter('users calls'),
    },
]

export default function () {
    const number = randomIntBetween(0, 2);
    const { url, counter } = endpoints[number];

    const res = http.get(url);
    counter.add(1);
}
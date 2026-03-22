import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
};

const BASE_URL = 'http://localhost:3000';

export default function () {

  // Endpoint 1: Health
  const res1 = http.get(`${BASE_URL}/health`);
  check(res1, {
    'health status 200': (r) => r.status === 200,
  });

  sleep(1);

  // Endpoint 2: Items
  const res2 = http.get(`${BASE_URL}/items`);
  check(res2, {
    'items status 200': (r) => r.status === 200,
    'items no vacio': (r) => JSON.parse(r.body).length > 0,
  });

  sleep(1);
}
import http from 'k6/http';
import { check, sleep } from 'k6';

// Configuración de la prueba de carga (Load Test Scenario)
export const options = {
  stages: [
    { duration: '30s', target: 20 }, // Sube a 20 usuarios virtuales en 30 segundos
    { duration: '1m', target: 20 },  // Mantiene 20 usuarios durante 1 minuto
    { duration: '10s', target: 0 },  // Baja a 0 usuarios (rampa de bajada)
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // El 95% de las peticiones deben responder en menos de 500ms
    http_req_failed: ['rate<0.01'],  // Menos del 1% de errores permitidos
  },
};

export default function () {
  const res = http.get('https://api.regnology-mock.com/v1/health');
  
  check(res, {
    'status es 200': (r) => r.status === 200,
    'tiempo de respuesta < 200ms': (r) => r.timings.dur < 200,
  });

  sleep(1);
}
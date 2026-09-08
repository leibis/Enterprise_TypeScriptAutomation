import http from 'k6/http';
import { check, sleep } from 'k6';

// 1. CONFIGURACIÓN DEL ESCENARIO DE CARGA (Nivel Senior)
export const options = {
  stages: [
    { duration: '10s', target: 5 },  // Rampa de subida: Sube a 5 usuarios virtuales en 10 segundos
    { duration: '15s', target: 5 },  // Mantenimiento: Mantiene 5 usuarios por 15 segundos
    { duration: '5s', target: 0 },   // Rampa de bajada: Baja a 0 usuarios
  ],
  // Umbral de calidad (Performance Quality Gate)
  thresholds: {
    http_req_failed: ['rate<0.01'],   // Menos del 1% de errores permitidos en las llamadas
    http_req_duration: ['p(95)<500'], // El 95% de las peticiones deben responder en menos de 500ms
  },
};

// 2. LA PETICIÓN QUE SE REPETIRÁ MILES DE VECES
export default function () {
  // Simulamos una "Small Call" (petición rápida de API) a un servidor real de pruebas
  const response = http.get('https://jsonplaceholder.typicode.com/posts/1');

  // Aserciones de rendimiento de K6
  check(response, {
    'status es 200': (r) => r.status === 200,
    'tiempo de respuesta menor a 300ms': (r) => r.timings.dur < 300,
  });

  sleep(1); // Pausa de 1 segundo entre peticiones para simular comportamiento humano
}
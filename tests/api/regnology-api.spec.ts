import { test, expect } from '@playwright/test';

test('Validación de petición API en Playwright (JSONPlaceholder)', async ({ request }) => {
  // 1. Usamos una API pública real que sí responde
  const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: {
      title: 'Regnology Test Report',
      body: 'Validating API response structure',
      userId: 42
    }
  });
  
  // 2. Validamos que el servidor responde con un código 201 (Creado con éxito)
  expect(response.status()).toBe(201);

  // 3. Convertimos la respuesta a JSON
  const responseBody = await response.json();

  // 4. Aserciones clave
  expect(responseBody).toHaveProperty('id');
  expect(responseBody.title).toBe('Regnology Test Report');
});
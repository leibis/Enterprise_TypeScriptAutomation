import { test, expect } from '@playwright/test';

test('Optimización de Promesas en Paralelo (Nivel Senior)', async ({ request }) => {
    console.log('Iniciando llamadas en paralelo...');
    const startTime = Date.now();

    

    // Promise.all dispara todas las promesas al mismo tiempo y espera a que TODAS terminen
    const [response1, response2, response3] = await Promise.all([
        request.get('https://jsonplaceholder.typicode.com/posts/1'),
        request.get('https://jsonplaceholder.typicode.com/posts/2'),
        request.get('https://jsonplaceholder.typicode.com/posts/3')
    ]);

    const endTime = Date.now();
    console.log(`Las 3 llamadas terminaron en: ${endTime - startTime} milisegundos.`);
  
    // Aserciones
    expect(response1.ok()).toBeTruthy();
    expect(response2.ok()).toBeTruthy();
    expect(response3.ok()).toBeTruthy();
});
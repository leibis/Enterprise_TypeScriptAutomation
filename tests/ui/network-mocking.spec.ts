import { test, expect } from '@playwright/test';

test.describe('Network Interception & Mocking Suite', () => {

  test('Debe interceptar la llamada de la API y forzar un estatus Aprobado', async ({ page }) => {
    
    // 1. 💥 LA MAGIA: Interceptamos cualquier llamada que coincida con la URL de préstamos
    await page.route('**/api/v1/loans/status/*', async (route) => {
      
      console.log(`🌐 Interceptando llamada de red hacia: ${route.request().url()}`);

      // Detenemos la petición real y devolvemos nuestro propio JSON controlado
      await route.fulfill({
        status: 200, // Simulamos un código de respuesta OK
        contentType: 'application/json',
        body: JSON.stringify({
          loanId: "LN-MOCK-777",
          status: "APPROVED", // Forzamos el estado de aprobación
          amountApproved: 150000,
          applicantName: "Leibis Reyes (Mocked)"
        })
      });
    });

    // 2. Navegamos a la aplicación (en este ejemplo, navegamos a una app simulada o de pruebas)
    await page.goto('https://www.saucedemo.com/'); // O la URL de tu app de préstamos

    // NOTA: Si en tu aplicación se disparara la llamada a esa API, 
    // el navegador recibiría el JSON que escribimos arriba, sin haber tocado la base de datos real.
    
    console.log('✅ Interceptación configurada con éxito. El navegador ahora lee datos mocked.');
  });
});
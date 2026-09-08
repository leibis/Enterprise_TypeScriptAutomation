import { test, expect } from '@playwright/test';

test.describe('Experimento de Red en Vivo - Saucedemo', () => {

  test('Sabotear la hoja de estilos en vivo usando page.route', async ({ page }) => {
    
    console.log('🤖 1. Configurando el interceptor de red para bloquear el CSS...');

    // Interceptamos cualquier archivo que termine en .css
    await page.route('**/*.css', async (route) => {
      console.log(`❌ Interceptado y BLOQUEADO: ${route.request().url()}`);
      
      // Abortamos la petición. El navegador nunca recibirá el diseño visual de la página
      await route.abort();
    });

    console.log('🌐 2. Navegando a Saucedemo en modo headed para ver el desastre visual...');
    
    // Navegamos a Saucedemo
    await page.goto('https://www.saucedemo.com/');

    // Esperamos 5 segundos para que puedas observar con tus propios ojos el navegador abierto
    await page.waitForTimeout(5000);

    // Aserción: La página cargó, pero el título del login sigue estando ahí en formato texto plano
    const loginButton = page.locator('[data-test="login-button"]');
    await expect(loginButton).toBeVisible();
    
    console.log('🎉 ¡Experimento completado! Viste en vivo cómo page.route alteró la red del navegador.');
  });
});
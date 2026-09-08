import { test, expect } from '@playwright/test';

test.describe('Práctica de Viabilidad - Playwright Core', () => {

  test('Validar que Playwright espera a que un botón sea cliqueable de forma automática', async ({ page }) => {
    
    await page.goto('https://www.saucedemo.com/');
    
    const loginButton = page.locator('[data-test="login-button"]');

    // 1. Verificamos que el locator NO apunta a un elemento congelado.
    // Podemos hacer aserciones de viabilidad directamente sin hacer clic:
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toBeEnabled();

    // 2. Si quisiéramos forzar un clic sin que Playwright haga las verificaciones
    // (Útil únicamente en casos muy extraños usando la opción force: true)
    // await loginButton.click({ force: true }); // ⚠️ Desaconsejado porque rompe el flujo real del usuario
    
    await loginButton.click();
    console.log('✅ Clic realizado aplicando todas las verificaciones automáticas de Playwright.');
  });
});
import { test, expect } from '@playwright/test';

test('Prueba de fallo a propósito para ver el Trace Viewer', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  
  // Buscamos un elemento que NO existe para forzar un fallo intencional
  const elementThatDoesNotExit = page.locator('#elemento-fantasma-que-no-existe');
  await expect(elementThatDoesNotExit).toBeVisible({ timeout: 3000 });
});
// Importamos "test" para definir casos de prueba y "expect" para aserciones.
import { test, expect } from '@playwright/test';

// Esta línea aplica configuración SOLO a este archivo de pruebas:
// le dice al runner que cree cada contexto de navegador usando
// la sesión guardada en este archivo JSON.
//Le dice a Playwright: “cada test de este archivo crea su browserContext cargando cookies/localStorage/sessionStorage de ese JSON”
test.use({ storageState: 'playwright/.auth/user.json' });

// Agrupamos pruebas relacionadas en una suite descriptiva.
test.describe('Day1 - Preauthenticated flows', () => {
  // Caso de prueba 1: verifica que el inventario cargue con sesión activa.
  test('Inventory is visible with preauthenticated session', async ({ page }) => {
    // Navegamos directo a una ruta que exige autenticación.
    // Si storageState funciona, no pide login.
    await page.goto('/inventory.html');

    // Aserción de URL: valida que seguimos en flujo autenticado.
    await expect(page).toHaveURL(/inventory/);

    // Aserción de UI principal: contenedor de inventario visible.
    await expect(page.locator('.inventory_list')).toBeVisible();

    // Aserción de contenido: al menos un ítem renderizado.
    await expect(page.locator('.inventory_item').first()).toBeVisible();
  });
});
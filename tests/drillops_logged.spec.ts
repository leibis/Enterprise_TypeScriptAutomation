import { test, expect } from '@playwright/test';
import { DrillOpsDashboardPage } from '../pages/DrillOpsDashboardPage.js';

// Para todos los tests que estén dentro de este archivo, antes de abrir el navegador, inyéctale en su memoria las cookies de sesión guardadas en el archivo user.json
test.use({ storageState: 'playwright/.auth/user.json' });

test('Logged Test - Validate dashboard is pre-authenticated', async ({ page }) => {
    console.log("🚀 [Logged Test] Abriendo la página del inventario directamente...");
    
    // Vamos directo a la página de inventario (sin pasar por el login)
    await page.goto('https://www.saucedemo.com/inventory.html');
    
    // Validamos que el inventario sea perfectamente visible de inmediato (gracias al storageState)
    const dashboard = new DrillOpsDashboardPage(page);
    await expect(dashboard.inventoryContainer).toBeVisible();
    
    console.log("✅ [Logged Test] Acceso pre-autenticado validado con éxito.");
});
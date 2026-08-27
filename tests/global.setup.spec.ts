import { test as setup, expect } from '@playwright/test';
import { DrillOpsDashboardPage } from '../pages/DrillOpsDashboardPage.js';
import { standardUser } from '../data/users.js';

// Definimos la misma ruta del archivo de sesión que pusimos en la configuración
const authFile = 'playwright/.auth/user.json';

setup('Global Setup - Authenticate and Save Session', async ({ page }) => {
    console.log("🔑 [Global Setup] Iniciando sesión única de seguridad...");
    
    const dashboard = new DrillOpsDashboardPage(page);
    await dashboard.navigateToDashboard();
    await dashboard.login(standardUser);
    
    // Validamos que el login haya sido exitoso esperando el contenedor principal
    await expect(dashboard.inventoryContainer).toBeVisible();
    
    // 💾 GUARDAR EL ESTADO: Playwright guarda las cookies y localStorage de la sesión en el archivo JSON
    await page.context().storageState({ path: authFile });
    
    console.log("💾 [Global Setup] Sesión guardada con éxito en:", authFile);
});
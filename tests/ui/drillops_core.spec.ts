import { test, expect } from '@playwright/test';
import { DrillOpsDashboardPage } from '../../src/pom/DrillOpsDashboardPage';
import { standardUser } from '../../src/data/users';

test.describe('DrillOps Dashboard Test Suite', () => {
    
    // Declaramos la variable de página para poder usarla en todas las pruebas
    let dashboardPage: DrillOpsDashboardPage;

    // 1. EL HOOK (Se ejecuta ANTES de cada test de este bloque)
    test.beforeEach(async ({ page }) => {
        dashboardPage = new DrillOpsDashboardPage(page);
        // Hacemos que todos los tests comiencen ya logueados
        await dashboardPage.navigateToDashboard();
        await dashboardPage.login(standardUser);
    });

    // 2. PRUEBA 1 (El login ya se hizo automáticamente por el beforeEach)
    test('@smokeValidate inventory loads after login', async () => {
        await expect(dashboardPage.inventoryContainer).toBeVisible({ timeout: 10000 });
    });

    // 3. PRUEBA 2 (El login se vuelve a hacer en un navegador limpio automáticamente)
    test('@smoke Validate cart functionality', async ({ page }) => {
        // Hacemos clic en el primer botón "Add to cart"
        const addToCartButton = page.locator('.btn_inventory').first();
        await addToCartButton.click();
        
        // Validamos que el icono del carrito muestre el número "1"
        const cartBadge = page.locator('.shopping_cart_badge');
        await expect(cartBadge).toHaveText('1');
    });
});
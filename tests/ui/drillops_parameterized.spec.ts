import { test, expect } from '../../src/fixtures/fixtures';
import { lockedOutUser } from '../../src/data/users';

// ---------------------------------------------------------------------
// 🟢 BLOQUE DE PRUEBA ESTÁNDAR (Usa el usuario por defecto: standardUser)
// ---------------------------------------------------------------------
test('@regression @ui Parameterized - Validate standard user logs in successfully', async ({ loggedDashboard }) => {
    // Validamos que el contenedor del inventario sea visible
    await expect(loggedDashboard.inventoryContainer).toBeVisible();
});


// ---------------------------------------------------------------------
// 🔴 BLOQUE DE PRUEBA DE BLOQUEO (Aislamos el uso de lockedOutUser)
// ---------------------------------------------------------------------
test.describe('Negative Scenarios - Locked Users', () => {
    
    // Al meter el "test.use" dentro del describe, la configuración
    // SOLO afectará a las pruebas que estén dentro de este bloque.
    test.use({ testUser: lockedOutUser });

    test('Parameterized - Validate locked out user is blocked', async ({ page }) => {
        // Asegurarnos de estar en la página de login
        await page.goto('/');

        // Realizar el login con el usuario bloqueado
        await page.locator('[data-test="username"]').fill('locked_out_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        // 💡 SOLUCIÓN SENIOR: Añadir un timeout explícito y depuración visual
        const errorMessage = page.locator('[data-test="error"]');
        
        // Esperamos a que el elemento sea visible con un mensaje de fallo más claro si no aparece
        await expect(errorMessage).toBeVisible({ timeout: 10000 });
        await expect(errorMessage).toContainText('Sorry, this user has been locked out.');
    });
});
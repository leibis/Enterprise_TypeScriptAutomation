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

    test('@regression @ui Parameterized - Validate locked out user is blocked', async ({ page }) => {
        // Como el usuario está bloqueado, validamos el mensaje de error de SauceDemo
        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Sorry, this user has been locked out.');
    });
});
// Importamos nuestro "test" extendido en lugar del de playwright por defecto
import { test, expect } from '../../src/fixtures/fixtures';

test('@regression @ui Advanced - Validate inventory using custom fixtures', async ({ loggedDashboard }) => {
    // ¡Fíjate en esto! Ya no escribimos beforeEach, ni new DrillOpsDashboardPage, ni login.
    // La fixture "loggedDashboard" hizo todo el trabajo por debajo de forma mágica y limpia.
    
    await expect(loggedDashboard.inventoryContainer).toBeVisible();
});
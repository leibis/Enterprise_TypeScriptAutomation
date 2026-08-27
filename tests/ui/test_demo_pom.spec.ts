import { test, expect } from '@playwright/test';
import { PlaywrightDemoPage } from '../../src/pom/PlaywrightDemoPage';

test('@regression @ui Validate search functionality using POM architecture', async ({ page }) => {
    // 1. Instanciamos la página usando nuestra arquitectura POM
    const demoPage = new PlaywrightDemoPage(page);

    // 2. Ejecutamos las acciones asíncronas de forma segura
    await demoPage.navigate();
    await demoPage.searchFor('Page Object Model');

     // Validamos de forma asíncrona que el contenedor de resultados de búsqueda sea visible
    await expect(page.locator('.DocSearch-Dropdown')).toBeVisible();
});
// Importamos helper de configuración de Playwright.
import { defineConfig } from '@playwright/test';

// Exportamos configuración principal.
export default defineConfig({
  // Directorio base de pruebas.
  testDir: './tests',

  // Hook global que prepara sesión antes de ejecutar la suite.
  globalSetup: './tests/global.setup.ts',

  // Configuración común para todos los tests/proyectos.
  use: {
    // URL base de la aplicación.
    baseURL: 'https://www.saucedemo.com',

    // Habilitamos trace al primer retry para diagnóstico.
    trace: 'on-first-retry',
  },

  // Ejemplo de proyectos multi-browser.
  projects: [
    {
      // Proyecto Chromium.
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
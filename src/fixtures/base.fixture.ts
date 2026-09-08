import { test as base, expect } from '@playwright/test';
import { runtimeConfig } from '../../config/env';
import { LoginPage } from '../pom/login.page';

// 1. Definimos el contrato extendido de nuestras fixtures
type EnterpriseFixtures = {
  config: typeof runtimeConfig;
  loginPage: LoginPage;
  apiHelper: {
    createLoanItem: (title: string) => Promise<number>;
  };
};

/**
 * Fixture extendida PRO: Inyecta configuración, páginas y utilidades de API.
 */
export const test = base.extend<EnterpriseFixtures>({
  // Fixture 1: Configuración global
  config: async ({}, use) => {
    await use(runtimeConfig);
  },

  // Fixture 2: Page Object de Login
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  // Fixture 3 PRO: Helper de API con Autolimpieza (Teardown) integrado
  apiHelper: async ({ request }, use) => {
    // 1. 📂 Registro temporal de IDs creados durante el test
    const createdLoanIds: number[] = [];

    const helper = {
      createLoanItem: async (title: string): Promise<number> => {
        console.log(`🚀 API-SETUP: Solicitando creación de préstamo: "${title}"...`);
        
        const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
          data: { title, body: 'Automated Loan Generation', userId: 1 },
        });
        
        expect(response.status()).toBe(201);
        const body = await response.json();
        const newId = body.id;

        // Guardamos el ID en nuestro registro para limpiarlo después
        createdLoanIds.push(newId);
        console.log(`✅ API-SETUP: Préstamo creado en el backend con ID: ${newId}`);
        
        return newId; // Retorna el ID creado por la API
      },
    };

    // 2. 🔌 Entregamos el helper al test para que se ejecute la prueba
    await use(helper);

    // ==========================================================
    // 3. 🧹 FASE DE TEARDOWN (Se ejecuta automáticamente al terminar el test)
    // ==========================================================
    if (createdLoanIds.length > 0) {
      console.log(`API-TEARDOWN: Iniciando limpieza de seguridad para ${createdLoanIds.length} préstamo(s)...`);
      
      for (const id of createdLoanIds) {
        console.log(`API-TEARDOWN: Eliminando préstamo con ID: ${id}...`);
        
        const deleteResponse = await request.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
        expect(deleteResponse.ok()).toBeTruthy();
      }
      
      console.log('✅ API-TEARDOWN: ¡Limpieza completada! El entorno ha quedado intacto.');
    }
  },
});

export { expect };
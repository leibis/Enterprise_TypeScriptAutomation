import { test as base, expect } from '@playwright/test';
import { runtimeConfig } from '../../config/env';
import { LoginPage } from '../pom/login.page';

// 1. Definimos el contrato extendido de nuestras fixtures
type EnterpriseFixtures = {
  config: typeof runtimeConfig;
  loginPage: LoginPage;
  // Podemos inyectar helpers de API o datos dinámicos aquí
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

  // Fixture 3 PRO: Helper de API inyectado directamente en el test
  apiHelper: async ({ request }, use) => {
    const helper = {
      createLoanItem: async (title: string): Promise<number> => {
        const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
          data: { title, body: 'Automated Loan Generation', userId: 1 },
        });
        expect(response.status()).toBe(201);
        const body = await response.json();
        return body.id; // Retorna el ID creado por la API
      },
    };
    await use(helper);
  },
});

export { expect };
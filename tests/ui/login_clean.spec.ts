import { test, expect } from '../../src/fixtures/base.fixture';

test.describe('Suite de Autenticación - Arquitectura Enterprise', () => {

  test('Validar login exitoso o bloqueo con fixture inyectada', async ({ loginPage, config }) => {
    // 1. Navegamos usando la URL del runtimeConfig centralizado
    await loginPage.navigate(config.baseURL);

    // 2. Realizamos la acción de login
    await loginPage.login('standard_user', 'secret_sauce');

    // 3. Aserción de éxito (ejemplo)
    await expect(loginPage['page']).toHaveURL(/inventory\.html/);
  });

});
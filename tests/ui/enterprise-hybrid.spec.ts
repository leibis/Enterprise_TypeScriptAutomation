import { test, expect } from '../../src/fixtures/base.fixture';

test.describe('Enterprise Hybrid Suite - UI & API Integration', () => {

  test('Debe crear un registro vía API usando la fixture PRO y validar el flujo', async ({ loginPage, config, apiHelper }) => {
    
    console.log(`🚀 Iniciando prueba en entorno: ${config.env}`);

    // 1. Usamos la fixture PRO 'apiHelper' para crear un recurso en el backend de forma instantánea
    const newId = await apiHelper.createLoanItem('Préstamo Especial Enterprise - Regnology & Ford');
    console.log(`✅ Recurso creado exitosamente por API con ID: ${newId}`);

    // 2. Usamos el Page Object de Login para navegar y hacer login
    await loginPage.navigate(config.baseURL);
    await loginPage.login('standard_user', 'secret_sauce');

    // 3. Validación visual de que entramos al inventario/dashboard
    await expect(loginPage['page']).toHaveURL(/inventory\.html/);
    
    console.log('¡Prueba híbrida ejecutada y validada con éxito!');
  });

});
// Importa navegador Chromium y el tipo FullConfig de Playwright.
// FullConfig representa la configuración completa efectiva del runner.
import { chromium, FullConfig } from '@playwright/test';

// Importa módulos nativos de Node para manejar archivos y rutas.
import fs from 'fs';
import path from 'path';

// Importa datos de usuario desde la capa de test data.
import { standardUser } from '../src/data/users';

/**
 * Función que Playwright ejecuta UNA vez antes de correr tests.
 * El parámetro _config llega tipado, aunque aquí no lo usemos.
 */
export default async function globalSetup(_config: FullConfig) {
  // Define carpeta donde guardaremos estado de autenticación.
  const authDir = path.join(process.cwd(), 'playwright', '.auth');

  // Define archivo JSON final con cookies/localStorage/sessionStorage.
  const authFile = path.join(authDir, 'user.json');

  // Crea carpeta si no existe (recursive evita errores por estructura faltante).
  fs.mkdirSync(authDir, { recursive: true });
  // Si existe archivo anterior, lo eliminamos para evitar estado stale.
  // (Útil en CI para corridas limpias y reproducibles).
  if (fs.existsSync(authFile)) {
    fs.unlinkSync(authFile);
    }
    
  // Levanta Chromium para realizar login real.
  const browser = await chromium.launch();

  // Crea una página limpia.
  const page = await browser.newPage();

  // Va a la pantalla de login.
  await page.goto('https://www.saucedemo.com/');

  // Completa usuario.
  await page.locator('[data-test="username"]').fill(standardUser.username);

  // Completa password.
  await page.locator('[data-test="password"]').fill(standardUser.password);

  // Envía formulario.
  await page.locator('[data-test="login-button"]').click();

  // Espera condición REAL de login exitoso.
  // Esto evita guardar un estado inválido.
  await page.locator('.inventory_list').waitFor({ state: 'visible', timeout: 10000 });

  // Guarda estado del contexto (cookies + storages) al archivo.
  await page.context().storageState({ path: authFile });

  // Cierra navegador para liberar recursos.
  await browser.close();
}
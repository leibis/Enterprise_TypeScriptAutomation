import { type Page, type Locator, expect } from '@playwright/test';
import { type TestUser } from '../data/users';

/**
 * Page Object Model del dashboard de DrillOps/SauceDemo.
 * Encapsula selectores y acciones de login/inventario.
 */
export class DrillOpsDashboardPage {
  /** Instancia de Playwright Page. */
  private readonly page: Page;

  /** Campo username en login. */
  readonly usernameInput: Locator;

  /** Campo password en login. */
  readonly passwordInput: Locator;

  /** Botón de autenticación. */
  readonly loginButton: Locator;

  /** Contenedor principal de inventario (post-login). */
  readonly inventoryContainer: Locator;

  /**
   * Constructor del POM.
   * @param page Página activa del navegador.
   */
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
  }

  /**
   * Navega al dashboard/login usando URL base parametrizada.
   * @param baseURL URL del sitio a probar.
   */
  async navigateToDashboard(baseURL: string): Promise<void> {
    await this.page.goto(baseURL);
  }

  /**
   * Ejecuta login con credenciales de usuario.
   * @param user Usuario de prueba tipado.
   */
  async login(user: TestUser): Promise<void> {
    await this.usernameInput.fill(user.username);
    await this.passwordInput.fill(user.password);
    await this.loginButton.click();
  }

  /**
   * Verifica que el inventario esté visible tras login.
   */
  async assertInventoryVisible(): Promise<void> {
    await expect(this.inventoryContainer).toBeVisible({ timeout: 10000 });
  }
}
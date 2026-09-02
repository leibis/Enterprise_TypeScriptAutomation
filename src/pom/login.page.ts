import { Page, Locator } from '@playwright/test';

export class LoginPage {
  // 1. Declaramos las propiedades privadas (Encapsulamiento estricto)
  private readonly page: Page;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // 2. Definimos los selectores utilizando atributos estables (data-test)
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Navega a la URL base configurada
   */
  async navigate(url: string) {
    await this.page.goto(url);
  }

  /**
   * Realiza la acción completa de inicio de sesión
   */
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Obtiene el texto del mensaje de error si el login falla
   */
  async getErrorMessage(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible' });
    return await this.errorMessage.textContent() || '';
  }
}
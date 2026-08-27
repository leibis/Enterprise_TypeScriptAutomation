import { type Page, type Locator, expect } from '@playwright/test';
import { type TestUser } from '../data/users.js';   

export class DrillOpsDashboardPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator; // ⬅️ 1. NUEVA VARIABLE
    readonly loginButton: Locator;
    readonly inventoryContainer: Locator;

    constructor(page: Page) {
        this.page = page;
        // Usamos la app de práctica real de QA (SauceDemo)
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.inventoryContainer = page.locator('.inventory_list');
    }

    async navigateToDashboard() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(user: TestUser) {
        await this.usernameInput.fill(user.username); // ⬅️ 2. USAMOS LA VARIABLE LIMPIA EN LUGAR DE BUSCAR AL VUELO
                // ⬅️ 3. AHORA SÍ: USAMOS LA VARIABLE LIMPIA EN LUGAR DE BUSCAR AL VUELO
        await this.passwordInput.fill(user.password); // ⬅️ 4. AHORA SÍ: USAMOS LA VARIABLE LIMPIA EN LUGAR DE BUSCAR AL VUELO
        
        await this.loginButton.click();
    }
}
import { type Page, type Locator } from '@playwright/test';

export class PlaywrightDemoPage {
    // 1. Definición estricta de variables con sus tipos de datos (TypeScript)
    readonly page: Page;
    readonly searchBox: Locator;
    readonly searchButton: Locator;

    constructor(page: Page) {
        this.page = page;
        // 2. Localizadores (Locators)
        this.searchBox = page.getByRole('button', {name: 'Search'});
        this.searchButton = page.locator("button:has-text('Search')");
    }

    // 3. Acciones Asíncronas (async/await) [3]
    async navigate() {
        await this.page.goto('https://playwright.dev');
    }

    async searchFor(term: string) {
        // 1. Hacemos clic en el botón de búsqueda para abrir el input
        await this.searchBox.click();
        
        // 2. Buscamos el campo de texto real que se abre y escribimos
        const inputReal = this.page.locator('#docsearch-input');
        await inputReal.fill(term);
        
        // 3. Presionamos Enter
        await inputReal.press('Enter');
    }
}
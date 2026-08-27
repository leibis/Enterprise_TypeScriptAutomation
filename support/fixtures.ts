import { test as base } from '@playwright/test';
import { DrillOpsDashboardPage } from '../pages/DrillOpsDashboardPage.js';
import { standardUser, lockedOutUser, type TestUser  } from '../data/users.js';


// 1. Definimos las opciones personalizadas que nuestra fixture aceptará
type CustomOptions = {
    testUser: TestUser; // El test puede decidir qué usuario pasar
};

// 2. Definimos las fixtures de objetos que entregaremos
type MyFixtures = {
    loggedDashboard: DrillOpsDashboardPage;
};

// Extendemos el test base de Playwright
export const test = base.extend<CustomOptions & MyFixtures>({
    
    // Definimos un valor por defecto para la opción (si el test no dice nada, usa standardUser)
    testUser: [standardUser, { option: true }],

    // Creamos nuestra fixture parametrizada
    loggedDashboard: async ({ page, testUser }, use) => {
        // --- SETUP (Preparación automática) ---
        const dashboard = new DrillOpsDashboardPage(page);
        await dashboard.navigateToDashboard();


        // La fixture usa dinámicamente el usuario que el test le haya pasado
        await dashboard.login(testUser);
        
        // --- USAGE (Entregamos el objeto listo al test) ---
        await use(dashboard);
        
        // --- TEARDOWN (Limpieza opcional al terminar) ---
        // Aquí podrías cerrar sesiones o limpiar cookies si fuera necesario
    },
});

export { expect } from '@playwright/test';
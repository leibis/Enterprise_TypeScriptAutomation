import { test, expect } from '@playwright/test';

test('Network Interception - Mocking DrillOps Telemetry API', async ({ page }) => {
    
    // 1. INTERCEPCIÓN DE RED (ROUTE FULFILLMENT):
    // Interceptamos la llamada a la API de telemetría del pozo petrolero
    await page.route('**/api/v1/telemetry/*', async route => {
        
        // Creamos nuestro "Mock" con datos de emergencia personalizados
        const mockTelemetryData = {
            rigId: "RIG-999-EMERGENCY",
            status: "CRITICAL_PRESSURE",
            psi: 8500.5,
            temperatureCelsius: 180.2
        };

        // Cumplimos la ruta inyectando nuestro JSON simulado
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockTelemetryData)
        });
    });

    // 2. EJECUCIÓN (Hacemos que la página intente consumir esa API)
    await page.goto('https://jsonplaceholder.typicode.com/'); // Usamos una URL base activa para el test
    
    // Playwright hace la petición que coincide con nuestro patrón de intercepción
    const response = await page.evaluate(async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/api/v1/telemetry/rig-01');
        return res.json();
    });

    // 3. VALIDACIÓN:
    // Comprobamos que el navegador recibió exactamente nuestro "Mock" en lugar del backend real
    console.log("📊 Datos de Telemetría recibidos en el navegador:", response);
    
    expect(response.rigId).toBe("RIG-999-EMERGENCY");
    expect(response.status).toBe("CRITICAL_PRESSURE");
    expect(response.psi).toBe(8500.5);
});
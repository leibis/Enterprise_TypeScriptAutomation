import { test, expect } from '@playwright/test';

test('@regression @ui Advanced UI - Interacting with iFrames and Dynamic Tables', async ({ page }) => {
    
    // 1. SETUP DEL MOCK: 
    // Como no tenemos acceso al servidor real de DrillOps, vamos a inyectar directamente en el 
    // navegador una estructura HTML muy compleja que simula un iFrame de telemetría con una tabla.
    await page.goto('about:blank');
    await page.evaluate(() => {
        // Creamos un iFrame y lo inyectamos en la página principal
        const iframe = document.createElement('iframe');
        iframe.id = 'telemetry-dashboard-frame';
        iframe.name = 'telemetry-dashboard-frame';
        iframe.style.width = '100%';
        iframe.style.height = '500px';
        document.body.appendChild(iframe);

        // Inyectamos el contenido (La Tabla Dinámica) DENTRO del iFrame
        const frameDoc = iframe.contentWindow?.document;
        if (frameDoc) {
            frameDoc.open();
            frameDoc.write(`
                <html><body>
                    <h2>Live Rig Telemetry</h2>
                    <table id="rig-table">
                        <thead><tr><th>Rig ID</th><th>Depth (m)</th><th>Status</th><th>Action</th></tr></thead>
                        <tbody>
                            <tr class="rig-row"><td>RIG-Alpha</td><td>4500</td><td><span class="badge ok">ACTIVE</span></td><td><button>Stop</button></td></tr>
                            <tr class="rig-row"><td>RIG-Bravo</td><td>8200</td><td><span class="badge warning">CRITICAL_PRESSURE</span></td><td><button class="alert-btn">Acknowledge</button></td></tr>
                            <tr class="rig-row"><td>RIG-Charlie</td><td>1200</td><td><span class="badge ok">ACTIVE</span></td><td><button>Stop</button></td></tr>
                        </tbody>
                    </table>
                </body></html>
            `);
            frameDoc.close();
        }
    });

    // =====================================================================
    // 🛠️ RESOLUCIÓN DEL RETO DE ARQUITECTURA (Nivel Senior)
    // =====================================================================
    
    // RETO 1: Atravesar el iFrame
    // En lugar de usar page.locator, usamos page.frameLocator para entrar a la "caja fuerte"
    const dashboardFrame = page.frameLocator('#telemetry-dashboard-frame');

    // RETO 2: Encontrar la fila dinámica en la tabla
    // El pozo en estado crítico (RIG-Bravo) puede cambiar de posición en la tabla cada segundo.
    // Solución: Buscamos TODAS las filas (.rig-row) y las filtramos para quedarnos SOLO con la que contiene el texto "RIG-Bravo"
    const criticalRigRow = dashboardFrame.locator('.rig-row').filter({ hasText: 'RIG-Bravo' });
    
    // RETO 3: Validar el estado y hacer clic en el botón de esa fila específica
    // A partir de la fila filtrada, buscamos los elementos internos
    const statusBadge = criticalRigRow.locator('.badge');
    const acknowledgeButton = criticalRigRow.locator('button.alert-btn');

    // Ejecutamos las aserciones y acciones
    await expect(statusBadge).toHaveText('CRITICAL_PRESSURE');
    await acknowledgeButton.click();
    
    console.log("✅ Éxito: iFrame atravesado y botón de alerta presionado en la fila dinámica correcta.");
});
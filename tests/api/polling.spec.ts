import { test, expect } from '@playwright/test';

test.describe('Asynchronous API Testing - Polling Pattern', () => {

  // Reemplaza esto con la URL exacta que te dio Beeceptor
  const BEECEPTOR_URL = 'https://polling-api.free.beeceptor.com';

  test('Debe solicitar un reporte (202) y hacer polling hasta que el estado sea COMPLETED', async ({ request }) => {
    
    console.log('🚀 Iniciando flujo asíncrono...');

    // ==========================================
    // 1. DISPARAR LA TAREA (El servidor responde rápido que está "Pensando")
    // ==========================================
    const triggerResponse = await request.post(`${BEECEPTOR_URL}/api/reports`);
    
    // Validamos el contrato de Asincronía (202 Accepted)
    expect(triggerResponse.status()).toBe(202); 
    
    const triggerData = await triggerResponse.json();
    const jobId = triggerData.jobId;
    console.log(`✅ Tarea aceptada por el servidor. JobID: ${jobId}`);

    // ==========================================
    // 2. PATRÓN DE POLLING (Preguntar hasta que termine)
    // ==========================================
    let isComplete = false;
    let attempts = 0;
    const maxRetries = 5;
    let finalReportData;

    console.log('⏳ Iniciando sondeo (polling)...');

    while (!isComplete && attempts < maxRetries) {
      attempts++;
      
      // Consultamos el estado del reporte
      const statusResponse = await request.get(`${BEECEPTOR_URL}/api/reports/${jobId}`);
      const statusData = await statusResponse.json();
      
      console.log(`Intento ${attempts}: Estado = ${statusData.status}`);

      if (statusData.status === 'COMPLETED') {
        isComplete = true;
        finalReportData = statusData;
        break; // Rompemos el ciclo porque ya terminó
      }

      // Si no ha terminado, esperamos 2 segundos (2000 ms) antes de volver a preguntar
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // ==========================================
    // 3. ASERCIONES FINALES
    // ==========================================
    // Validamos que salimos del ciclo porque terminó, no por timeout
    expect(isComplete).toBeTruthy(); 
    expect(finalReportData).toHaveProperty('url');
    console.log('Flujo asíncrono completado con éxito!');
  });
});
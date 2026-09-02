// 1. Importaciones limpias y únicas usando nuestras fixtures y config unificadas
import { test, expect } from '../../src/fixtures/base.fixture'; // Ojo: base.fixtures (con 's')
import { runtimeConfig } from '../../config/env'; // Ajusta los puntos si es necesario



test.beforeEach(async () => {
  if (!runtimeConfig.baseURL || runtimeConfig.baseURL.includes("TU-URL-REAL")) {
    // Si estamos en modo simulación, permitimos continuar o lanzamos aviso
    console.log("⚠️ Advertencia: URL configurada como placeholder.");
  }
});

test('Smoke Test - Validar configuración inicial de Loan', async ({ config }) => {
  // Validamos que la configuración cargue correctamente
  console.log(`🚀 Ejecutando prueba para la app: ${config.app} en entorno: ${config.env}`);
  console.log(`🌐 URL base activa: ${config.baseURL}`);
  
  expect(config.baseURL).toBeDefined();
});
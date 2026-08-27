// Esta función pausa la ejecución del código por los milisegundos que le indiquemos
const esperar = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Definimos una interfaz para saber exactamente qué formato tendrá la respuesta del pago
interface RespuestaPago {
  exito: boolean;
  transaccionId: string | null; // Puede ser un texto con el ID o "null" si falla
}

// Creamos la función asíncrona que retorna una Promesa que contiene una RespuestaPago
async function procesarPago(monto: number, status: 'completed' | 'failed'): Promise<RespuestaPago> {
  console.log(`[Pasarela] Procesando transacción por un monto de $${monto}...`);
  
  // Simulamos que el banco tarda 3 segundos en procesar el pago
  await esperar(3000); 

  if (status === 'completed') {
    // Si el pago es exitoso, devolvemos éxito y un ID simulado
    return {
      exito: true,
      transaccionId: 'TXN-2026-PLAYWRIGHT'
    };
  } else {
    // Si el pago falla, devolvemos exito en false y sin ID (null)
    return {
      exito: false,
      transaccionId: null
    };
  }
}

async function ejecutarFlujoDePrueba() {
  console.log('--- INICIANDO CASO DE PRUEBA: COMPRA CON TARJETA ---');
  
  const montoA_Pagar = 150.00;
  console.log(`[Test] Iniciando pago de $${montoA_Pagar}...`);

  // Llamamos a la función y ESPERAMOS (await) 3 segundos a que responda
  const resultado = await procesarPago(montoA_Pagar, 'completed');

  console.log('\n--- RESULTADO DE LA TRANSACCIÓN ---');
  console.log(`¿Pago Exitoso?: ${resultado.exito}`);
  console.log(`ID de Transacción: ${resultado.transaccionId}`);
  
  // Una pequeña aserción (verificación de QA)
  if (resultado.exito === true) {
    console.log('✅ TEST PASADO: El pago se completó correctamente.');
  } else {
    console.log('❌ TEST FALLIDO: El pago no se pudo procesar.');
  }
}

// ¡No olvides llamar a la función para que se ejecute!
ejecutarFlujoDePrueba();
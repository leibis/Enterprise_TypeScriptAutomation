// Una función que simula una espera en milisegundos (como el delay de la red)
const esperar =(ms:number) => new Promise(resolve => setTimeout(resolve,ms));

// Definimos la interfaz del usuario que esperamos recibir
interface Usuario {
  id: number;
  nombre: string;
  rol: string;
}

// 1. La palabra clave "async" indica que esta función maneja procesos asíncronos
async function obtenerUsuarioDeAPI(idUsuario: number): Promise<Usuario> {
    console.log('[API] Solicitando datos del usuario con ID: ${idUsuario}...');

// 2. Usamos "await" para esperar a que pasen 2 segundos simulando la red
await esperar(2000); 
  
console.log(`[API] ¡Datos recibidos del servidor!`);
  
// Retornamos el resultado simulado
  return {
    id: idUsuario,
    nombre: 'Ana QA',
    rol: 'Automation Engineer'
  };
}

// 3. Para usar "await", la función contenedora principal también debe ser "async"
async function ejecutarFlujoDePrueba() {
  console.log('--- INICIO DEL TEST ---');
  
  // Esperamos a que la API responda y guardamos el resultado
  const usuario = await obtenerUsuarioDeAPI(45);
  
  console.log(`[TEST] Verificando que el usuario obtenido sea: ${usuario.nombre}`);
  console.log(`[TEST] Verificando rol: ${usuario.rol}`);
  
  console.log('--- FIN DEL TEST EXITOSO ---');
}

// Ejecutamos el flujo
ejecutarFlujoDePrueba();
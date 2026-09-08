import { test, expect } from '@playwright/test';
import { z } from 'zod'; // Importamos Zod

// 1. DEFINIMOS EL ESQUEMA DE VALIDACIÓN (El contrato estricto de Zod)
const UserResponseSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "El nombre no puede estar vacío"),
  email: z.string().email("Debe ser un formato de correo electrónico válido"),
  status: z.enum(["active", "inactive"]),
  age: z.number().min(18, "El usuario debe ser mayor de edad")
});

// Extraemos el tipo estricto de TypeScript directamente desde el esquema de Zod (¡Doble poder!)
/** No tienes que escribir una interface de TypeScript a mano. Zod deduce el tipo automáticamente 
a partir de tu esquema de validación, garantizando que el tipado y la validación en tiempo de ejecución 
estén perfectamente sincronizados.**/
type UserResponse = z.infer<typeof UserResponseSchema>;

test.describe('API Validation with Zod (Contract Testing)', () => {

  test('Validar contrato JSON de un usuario con Zod', async ({ request }) => {
    
    // 2. Simulamos que llamamos a la API de un microservicio
    // (Usamos un Mock local para asegurarnos de que corra siempre)
    const mockResponseBody = {
      id: 99,
      name: "Leibis Reyes",
      email: "leibis@epam.com", // 👈 Prueba cambiar esto por "correo-invalido" y verás cómo falla hermoso
      status: "active",
      age: 28
    };

    console.log('🔍 Iniciando validación de contrato con Zod...');

    // 3. Esta función de Zod valida el objeto en tiempo de ejecución. 
    //Si el backend cambia un tipo de dato por error o manda un nulo, Zod lo detectará de inmediato y 
    //te dirá exactamente qué campo falló("email: Debe ser un formato de correo válido").
    const validationResult = UserResponseSchema.safeParse(mockResponseBody);

    // 4. Evaluamos el resultado de la validación
    if (!validationResult.success) {
      console.error("❌ El JSON de la API no cumple con el contrato:", validationResult.error.format());
    }

    // Aserción de Playwright: La validación DEBE ser exitosa
    expect(validationResult.success).toBe(true);

    console.log('✅ Contrato validado con éxito. El payload de la API es 100% seguro.');
  });
});
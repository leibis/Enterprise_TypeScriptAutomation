// 1. Definimos la plantilla para un Producto
interface Product {
  readonly id: number;      // El ID es de solo lectura (no se puede cambiar después)
  name: string;             // El nombre debe ser texto
  price: number;            // El precio debe ser un número
  category: 'electronics' | 'apparel' | 'books'; // Solo permite uno de estos tres valores
  discount?: number;        // El signo "?" significa que el descuento es opcional
}

// 3. Creamos productos simulados respetando la interfaz 'Product'
const libroQA: Product = {
  id: 101,
  name: 'Aprende Playwright en 7 días',
  price: 25.99,
  category: 'books'
};

// 2. Definimos la estructura de una Orden de Compra
type Order = {
  orderId: string;
  products: Product[];      // El corchete "[]" significa que es una LISTA (arreglo) de productos
  totalAmount: number;
  paymentStatus: 'pending' | 'completed' | 'failed'; // Solo permite estos estados de pago
};

const auriculares: Product = {
  id: 102,
  name: 'Auriculares con Cancelación de Ruido',
  price: 89.99,
  category: 'electronics',
  discount: 0.10 // 10% de descuento (propiedad opcional)
};

// 4. Creamos la orden de compra usando el tipo 'Order'
const miOrden: Order = {
  orderId: 'ORD-2026-XYZ',
  products: [libroQA, auriculares], // Agregamos nuestros dos productos a la lista
  totalAmount: 115.98,
  paymentStatus: 'completed'
};

// 5. Imprimimos el resultado en la consola para verificar
console.log('--- ORDEN DE COMPRA DE QA EN PROCESO ---');
console.log(`ID de Orden: ${miOrden.orderId}`);
console.log(`Total a Pagar: $${miOrden.totalAmount}`);
console.log(`Estado del Pago: ${miOrden.paymentStatus}`);
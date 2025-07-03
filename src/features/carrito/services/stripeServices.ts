const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
import { makeAuthenticatedRequest } from './services';

export async function createPaymentIntentStripe(amount: number, carritoId: number): Promise<{ clientSecret: string }> {
  const res = await makeAuthenticatedRequest(`${API_URL}/stripe/create-payment-intent`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, carritoId }), // <--- Solo estos dos campos
  });
  if (!res.ok) throw new Error('Error al crear PaymentIntent');
  const data = await res.json();
  if (data.clientSecret) {
    return { clientSecret: data.clientSecret };
  }
  throw new Error('Respuesta inesperada del servidor');
}

export async function getPedidoByPaymentIntent(paymentIntentId: string): Promise<any> {
  const res = await fetch(`${API_URL}/pedidos?payment_intent=${paymentIntentId}`);
  if (!res.ok) throw new Error('Error al obtener el pedido');
  const data = await res.json();
  if (data && data.pedido) {
    return data.pedido;
  }
  throw new Error('No se encontró el pedido para este pago');
}
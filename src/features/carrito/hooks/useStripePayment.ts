import { useState } from 'react';
import { createPaymentIntentStripe } from '../services/stripeServices';

export function useStripePayment() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPayment = async (amount: number, carritoId: number) => {
    setLoading(true);
    setError(null);
    try {
      const { clientSecret } = await createPaymentIntentStripe(amount, carritoId);
      setClientSecret(clientSecret);
    } catch (err: any) {
      setError(err.message || 'Error al crear PaymentIntent');
    } finally {
      setLoading(false);
    }
  };

  return { clientSecret, loading, error, createPayment };
} 
import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import type { StripeError } from '@stripe/stripe-js';
import { useAuth } from '../../auth/context';
import { updatePerfilUsuario } from '../../usuarios/services/services';


interface StripeCheckoutFormProps {
  clientSecret: string;
  onSuccess?: () => void;
}

const StripeCheckoutForm: React.FC<StripeCheckoutFormProps> = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { usuario, accessToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState<'datos' | 'pago'>('datos');
  const [direccion, setDireccion] = useState(usuario?.direccion || '');
  const [telefono, setTelefono] = useState(usuario?.telefono || '');
  const [formError, setFormError] = useState<string | null>(null);

  const handleUpdatePerfil = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!direccion.trim() || !telefono.trim()) {
      setFormError('Debes completar ambos campos.');
      return;
    }
    if (!accessToken) {
      setFormError('No autenticado.');
      return;
    }
    setLoading(true);
    try {
      await updatePerfilUsuario(accessToken, { direccion, telefono });
      setStep('pago');
    } catch (err: any) {
      setFormError('Error al guardar los datos.');
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (!stripe || !elements) {
      setError('Stripe no está listo.');
      setLoading(false);
      return;
    }
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + '/success',
      },
    });
    if (result.error) {
      setError(result.error.message || 'Error al procesar el pago');
      setLoading(false);
      if (result.error.code === 'payment_canceled') {
        window.location.href = '/cancel';
      }
      return;
    }
    if ('paymentIntent' in result && result.paymentIntent && (result.paymentIntent as any).status === 'succeeded') {
      setSuccess(true);
      if (onSuccess) onSuccess();
      window.location.href = `/success?payment_intent=${(result.paymentIntent as any).id}`;
      return;
    }
    setLoading(false);
  };

  return (
    <form onSubmit={step === 'datos' ? handleUpdatePerfil : handleSubmit} style={{ maxWidth: 420, margin: '0 auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px #0001', padding: '2em 2.5em' }}>
      <h5 className="mb-3" style={{ color: '#22c55e', fontWeight: 700 }}>Pago seguro con tarjeta</h5>
      {step === 'datos' ? (
        <>
          <div className="mb-3">
            <label className="form-label">Dirección de entrega</label>
            <input type="text" className="form-control" value={direccion} onChange={e => setDireccion(e.target.value)} placeholder="Ej: Calle 123, Ciudad" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Teléfono de contacto</label>
            <input type="tel" className="form-control" value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="Ej: 71234567" required />
          </div>
          {formError && <div className="alert alert-danger mt-2">{formError}</div>}
          <button
            type="submit"
            className="btn btn-principal w-100 mt-3"
            style={{ fontSize: 18, borderRadius: 14, fontWeight: 700, padding: '0.8em 0' }}
            disabled={loading}
          >
            {loading ? 'Guardando...' : 'Continuar'}
          </button>
        </>
      ) : (
        <>
          <PaymentElement options={{ layout: 'tabs' }} />
          {error && <div className="alert alert-danger mt-3">{error}</div>}
          {success && <div className="alert alert-success mt-3">¡Pago realizado con éxito!</div>}
          <button
            type="submit"
            className="btn btn-principal w-100 mt-4"
            style={{ fontSize: 18, borderRadius: 14, fontWeight: 700, padding: '0.8em 0' }}
            disabled={!stripe || loading}
          >
            {loading ? 'Procesando...' : 'Pagar ahora'}
          </button>
        </>
      )}
    </form>
  );
};

export default StripeCheckoutForm; 
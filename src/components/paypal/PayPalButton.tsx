'use client';

import { useState } from 'react';
import { setTransactionId } from '@/actions/payments/set-transaction-id';

interface Props {
  orderId: string;
  amount: number;
}

export const PayPalButton = ({ orderId, amount }: Props) => {
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState('');

  const handlePayment = async () => {
    setIsPaying(true);
    setError('');

    try {
      // Simulación de pago con PayPal
      // En producción, aquí iría la integración real con PayPal
      
      // Simular delay de procesamiento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generar ID de transacción simulado
      const transactionId = `PAYPAL-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Marcar orden como pagada
      const result = await setTransactionId(orderId, transactionId);
      
      if (result.ok) {
        // Recargar página para mostrar estado actualizado
        window.location.reload();
      } else {
        setError(result.message || 'Error al procesar el pago');
        setIsPaying(false);
      }
    } catch (err) {
      setError('Error al procesar el pago');
      setIsPaying(false);
    }
  };

  return (
    <div className="mt-6">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <button
        onClick={handlePayment}
        disabled={isPaying}
        className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${
          isPaying
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isPaying ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Procesando pago...
          </span>
        ) : (
          `Pagar $${amount.toFixed(2)} con PayPal`
        )}
      </button>
      
      <p className="text-xs text-gray-500 mt-2 text-center">
        Modo de prueba - El pago se simulará
      </p>
    </div>
  );
};

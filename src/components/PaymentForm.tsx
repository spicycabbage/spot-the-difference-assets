import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

// Load Stripe from environment variable
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!);

interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  powerups: {
    time: number;
    hints: number;
    skips: number;
  };
  color?: string;
  popular?: boolean;
}

interface PaymentFormProps {
  selectedPackage: Package;
  onSuccess: (powerups: any) => void;
  onCancel: () => void;
}

const CheckoutForm: React.FC<PaymentFormProps> = ({ selectedPackage, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Create payment intent when component loads
    const API_URL = process.env.REACT_APP_PAYMENT_SERVER_URL || 'http://localhost:3001';
    fetch(`${API_URL}/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        packageId: selectedPackage.id,
        customerEmail: 'player@game.com' // You can make this dynamic
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      } else {
        setError('Failed to initialize payment');
      }
    })
    .catch((err) => {
      setError('Payment initialization failed');
      console.error(err);
    });
  }, [selectedPackage.id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    const card = elements.getElement(CardElement);

    if (card) {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
        }
      });

      if (error) {
        setError(error.message || 'Payment failed');
        setLoading(false);
      } else if (paymentIntent?.status === 'succeeded') {
        // Confirm payment on backend and get powerups
        try {
          const API_URL = process.env.REACT_APP_PAYMENT_SERVER_URL || 'http://localhost:3001';
          const response = await fetch(`${API_URL}/confirm-payment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              paymentIntentId: paymentIntent.id
            }),
          });

          const result = await response.json();
          if (result.success) {
            onSuccess(result.powerups);
          } else {
            setError('Payment confirmation failed');
          }
        } catch (err) {
          setError('Payment confirmation failed');
        }
        setLoading(false);
      }
    }
  };

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  return (
    <div style={{
      padding: '24px',
      maxWidth: '400px',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ marginBottom: '24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
          Complete Your Purchase
        </h2>
        <div style={{
          padding: '16px',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>
            {selectedPackage.name}
          </h3>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: '4px 0' }}>
            {selectedPackage.description}
          </p>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#059669', marginTop: '8px' }}>
            {formatPrice(selectedPackage.price)}
          </div>
          <div style={{ marginTop: '12px', fontSize: '14px', color: '#374151' }}>
            <div>🕐 Time Boosts: +{selectedPackage.powerups.time}</div>
            <div>💡 Hints: +{selectedPackage.powerups.hints}</div>
            <div>⏭️ Skips: +{selectedPackage.powerups.skips}</div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{
          padding: '16px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
              },
            }}
          />
        </div>

        {error && (
          <div style={{
            color: '#dc2626',
            backgroundColor: '#fef2f2',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!stripe || loading}
            style={{
              flex: 2,
              padding: '12px',
              backgroundColor: loading ? '#9ca3af' : '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Processing...' : `Pay ${formatPrice(selectedPackage.price)}`}
          </button>
        </div>
      </form>

      <div style={{
        fontSize: '12px',
        color: '#6b7280',
        textAlign: 'center',
        marginTop: '16px'
      }}>
        🔒 Secure payment powered by Stripe
      </div>
    </div>
  );
};

const PaymentForm: React.FC<PaymentFormProps> = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm {...props} />
    </Elements>
  );
};

export default PaymentForm;
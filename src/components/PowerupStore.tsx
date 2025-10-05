import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

// Initialize Stripe from environment variable
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!);

type PowerupPackage = {
  id: string;
  name: string;
  description: string;
  price: number;
  powerups: {
    time: number;
    hints: number;
    skips: number;
  };
  popular?: boolean;
  bonus?: string;
};

type PowerupStoreProps = {
  onClose: () => void;
  onPurchaseComplete: (powerups: { time: number; hints: number; skips: number }) => void;
  currentPowerups: {
    time: number;
    hints: number;
    skips: number;
  };
};

const CheckoutForm: React.FC<{
  selectedPackage: PowerupPackage;
  onPaymentSuccess: (powerups: any) => void;
  onPaymentError: (error: string) => void;
  customerEmail: string;
}> = ({ selectedPackage, onPaymentSuccess, onPaymentError, customerEmail }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    try {
      // Create payment intent
      const response = await fetch('http://localhost:3001/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId: selectedPackage.id,
          customerEmail: customerEmail
        }),
      });

      const { clientSecret } = await response.json();

      // Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            email: customerEmail,
          },
        },
      });

      if (result.error) {
        onPaymentError(result.error.message || 'Payment failed');
      } else {
        setPaymentSucceeded(true);
        onPaymentSuccess(selectedPackage.powerups);
      }
    } catch (error) {
      onPaymentError('Network error. Please try again.');
    }

    setProcessing(false);
  };

  if (paymentSucceeded) {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h3>
        <p className="text-gray-600 mb-4">Your powerups have been added to your account.</p>
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">You received:</h4>
          <div className="text-sm text-green-700 space-y-1">
            <div>⏰ Time Powerups: +{selectedPackage.powerups.time}</div>
            <div>💡 Hints: +{selectedPackage.powerups.hints}</div>
            <div>⏭️ Skips: +{selectedPackage.powerups.skips}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">Order Summary</h4>
        <div className="flex justify-between items-center">
          <span className="text-blue-700">{selectedPackage.name}</span>
          <span className="text-xl font-bold text-blue-800">
            ${(selectedPackage.price / 100).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Information
          </label>
          <div className="border rounded-lg p-3 bg-white">
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
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || processing}
        className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
          processing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {processing ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
            <span>Processing...</span>
          </div>
        ) : (
          `Pay $${(selectedPackage.price / 100).toFixed(2)}`
        )}
      </button>

      <div className="text-xs text-gray-500 text-center">
        🔒 Secure payment powered by Stripe<br/>
        Your card information is encrypted and secure
      </div>
    </form>
  );
};

const PowerupStore: React.FC<PowerupStoreProps> = ({ onClose, onPurchaseComplete, currentPowerups }) => {
  const [packages, setPackages] = useState<PowerupPackage[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<PowerupPackage | null>(null);
  const [customerEmail, setCustomerEmail] = useState('player@game.com');
  const [paymentError, setPaymentError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch('http://localhost:3001/packages');
      const data = await response.json();
      setPackages(Object.values(data.packages));
    } catch (error) {
      console.error('Failed to fetch packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = (powerups: any) => {
    onPurchaseComplete(powerups);
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const handlePaymentError = (error: string) => {
    setPaymentError(error);
    setTimeout(() => setPaymentError(''), 5000);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8">
          <div className="flex items-center space-x-3">
            <div className="animate-spin h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full"></div>
            <span>Loading store...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {!selectedPackage ? (
          // Package selection view
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">🛒 Powerup Store</h2>
                <p className="text-gray-600">Enhance your gaming experience with premium powerups</p>
              </div>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Current powerups display */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">Your Current Powerups:</h3>
              <div className="flex space-x-6 text-sm">
                <div className="flex items-center space-x-1">
                  <span>⏰</span>
                  <span>Time: {currentPowerups.time}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>💡</span>
                  <span>Hints: {currentPowerups.hints}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>⏭️</span>
                  <span>Skips: {currentPowerups.skips}</span>
                </div>
              </div>
            </div>

            {/* Package selection */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg ${
                    pkg.popular ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => setSelectedPackage(pkg)}
                >
                  {pkg.popular && (
                    <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full text-center mb-2">
                      MOST POPULAR
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                  
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-green-600">
                      ${(pkg.price / 100).toFixed(2)}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>⏰ Time Powerups:</span>
                      <span className="font-semibold">{pkg.powerups.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>💡 Hints:</span>
                      <span className="font-semibold">{pkg.powerups.hints}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>⏭️ Skips:</span>
                      <span className="font-semibold">{pkg.powerups.skips}</span>
                    </div>
                  </div>

                  {pkg.bonus && (
                    <div className="mt-3 p-2 bg-yellow-100 text-yellow-800 text-xs rounded">
                      🎁 {pkg.bonus}
                    </div>
                  )}

                  <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition-colors">
                    Select Package
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              💳 Secure payments • 🔒 SSL encrypted • 💯 Instant delivery
            </div>
          </div>
        ) : (
          // Payment view
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <button
                  onClick={() => setSelectedPackage(null)}
                  className="text-blue-600 hover:text-blue-800 text-sm mb-2"
                >
                  ← Back to packages
                </button>
                <h2 className="text-2xl font-bold text-gray-800">Complete Your Purchase</h2>
              </div>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            {paymentError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                ⚠️ {paymentError}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Package Details</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-lg">{selectedPackage.name}</h4>
                  <p className="text-gray-600 mb-3">{selectedPackage.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>⏰ Time Powerups:</span>
                      <span className="font-semibold">+{selectedPackage.powerups.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>💡 Hints:</span>
                      <span className="font-semibold">+{selectedPackage.powerups.hints}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>⏭️ Skips:</span>
                      <span className="font-semibold">+{selectedPackage.powerups.skips}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Payment</h3>
                <Elements stripe={stripePromise}>
                  <CheckoutForm
                    selectedPackage={selectedPackage}
                    onPaymentSuccess={handlePaymentSuccess}
                    onPaymentError={handlePaymentError}
                    customerEmail={customerEmail}
                  />
                </Elements>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PowerupStore;
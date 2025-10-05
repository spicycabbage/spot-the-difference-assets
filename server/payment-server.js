// Load .env file only if it exists (local development)
try {
  require('dotenv').config();
} catch (e) {
  // dotenv not needed in production
}
const express = require('express');

// Debug: Log first 15 characters of Stripe key
const stripeKey = process.env.STRIPE_SECRET_KEY;
console.log('🔑 Stripe key starts with:', stripeKey ? stripeKey.substring(0, 15) + '...' : 'MISSING!');

const stripe = require('stripe')(stripeKey);
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Powerup packages with real pricing
const POWERUP_PACKAGES = {
  casual: {
    id: 'casual',
    name: 'Casual Fan',
    description: 'Perfect for getting started',
    price: 99, // $0.99 in cents
    powerups: { time: 5, hints: 2, skips: 0 },
    color: 'yellow'
  },
  super: {
    id: 'super',
    name: 'Super Fan',
    description: 'Best value for regular players',
    price: 499, // $4.99 in cents
    powerups: { time: 25, hints: 15, skips: 1 },
    popular: true,
    color: 'green'
  },
  leader: {
    id: 'leader',
    name: 'Fan Club Leader',
    description: 'Maximum powerups for champions',
    price: 1999, // $19.99 in cents
    powerups: { time: 100, hints: 80, skips: 7 },
    color: 'purple'
  }
};

// Create payment intent
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { packageId, customerEmail } = req.body;
    
    const package = POWERUP_PACKAGES[packageId];
    if (!package) {
      return res.status(400).json({ error: 'Invalid package' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: package.price,
      currency: 'usd',
      metadata: {
        packageId: packageId,
        customerEmail: customerEmail || 'guest@game.com',
        powerupsTime: package.powerups.time.toString(),
        powerupsHints: package.powerups.hints.toString(),
        powerupsSkips: package.powerups.skips.toString()
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      package: package
    });
  } catch (error) {
    console.error('Payment intent creation failed:', error);
    res.status(500).json({ error: 'Payment processing failed' });
  }
});

// Confirm payment and get powerups
app.post('/confirm-payment', async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status === 'succeeded') {
      const metadata = paymentIntent.metadata;
      const powerups = {
        time: parseInt(metadata.powerupsTime),
        hints: parseInt(metadata.powerupsHints),
        skips: parseInt(metadata.powerupsSkips)
      };
      
      res.json({
        success: true,
        powerups: powerups,
        packageId: metadata.packageId,
        transactionId: paymentIntentId
      });
    } else {
      res.status(400).json({ error: 'Payment not completed' });
    }
  } catch (error) {
    console.error('Payment confirmation failed:', error);
    res.status(500).json({ error: 'Payment confirmation failed' });
  }
});

// Get available packages
app.get('/packages', (req, res) => {
  res.json({ packages: POWERUP_PACKAGES });
});

// In-memory store for pending powerups (in production, use a database)
const pendingPowerups = new Map();

// Webhook endpoint for Stripe payment completion
app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  // Handle checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const customerEmail = session.customer_details?.email || 'unknown';
    const productId = session.metadata?.product_id;
    
    // Map product IDs to powerups
    const productPowerups = {
      'prod_TAIwiwPlIasZAM': { time: 5, hints: 2, skips: 0 },   // Casual Fan
      'prod_TAIw8n9HgWbUR1': { time: 25, hints: 15, skips: 1 }, // Super Fan
      'prod_TAIwEzATegHXOR': { time: 100, hints: 80, skips: 7 } // Fan Club Leader
    };
    
    const powerups = productPowerups[productId];
    
    if (powerups) {
      // Store pending powerups for this customer
      if (!pendingPowerups.has(customerEmail)) {
        pendingPowerups.set(customerEmail, []);
      }
      pendingPowerups.get(customerEmail).push({
        powerups,
        timestamp: Date.now(),
        sessionId: session.id
      });
      
      console.log(`💰 Payment received from ${customerEmail} for product ${productId}`);
      console.log(`📦 Powerups pending: ${JSON.stringify(powerups)}`);
    }
  }
  
  res.json({received: true});
});

// Get pending powerups for a user
app.get('/pending-powerups/:email', (req, res) => {
  const email = req.params.email;
  const pending = pendingPowerups.get(email) || [];
  res.json({ pending });
});

// Claim pending powerups
app.post('/claim-powerups', async (req, res) => {
  const { email } = req.body;
  
  const pending = pendingPowerups.get(email) || [];
  
  if (pending.length === 0) {
    return res.json({ powerups: null });
  }
  
  // Sum up all pending powerups
  const totalPowerups = pending.reduce((acc, item) => ({
    time: acc.time + item.powerups.time,
    hints: acc.hints + item.powerups.hints,
    skips: acc.skips + item.powerups.skips
  }), { time: 0, hints: 0, skips: 0 });
  
  // Clear pending powerups for this user
  pendingPowerups.delete(email);
  
  console.log(`✅ Granted powerups to ${email}:`, totalPowerups);
  
  res.json({ powerups: totalPowerups });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Payment server running' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`💳 Payment server running on http://localhost:${PORT}`);
  console.log('🛒 Available packages:', Object.keys(POWERUP_PACKAGES));
});

module.exports = app;
require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
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
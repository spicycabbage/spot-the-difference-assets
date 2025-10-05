# Payment System Setup Instructions

## Overview
Your spot-the-difference game now has integrated Stripe payment processing for powerup packages!

## What's been implemented:

✅ **Payment Server** (`server/payment-server.js`)
- Handles Stripe payment intents
- Processes the 3 packages: Casual ($1.99), Super ($4.99), Leader ($19.99)
- Runs on http://localhost:3001

✅ **Payment Form Component** (`src/components/PaymentForm.tsx`)
- Beautiful Stripe card payment form
- Shows package details and pricing
- Secure payment processing

✅ **Updated Package Selector** (`src/components/PackageSelector.tsx`)
- Clicking any colored box now opens payment form
- Integrates with your existing UI design
- Maintains perfect mobile/desktop positioning

## Setup Steps:

### 1. Get Stripe API Keys
1. Sign up at [https://stripe.com](https://stripe.com)
2. Get your **Test** API keys from the Stripe Dashboard
3. You'll need:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`)

### 2. Update API Keys

**Keys are now stored in `.env` file (secure):**

1. Update `.env` file with your Stripe keys:
```
STRIPE_SECRET_KEY=sk_live_YOUR_KEYyour_secret_key_here
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_KEYyour_publishable_key_here
```

2. The code automatically loads from environment variables:
   - Server uses `process.env.STRIPE_SECRET_KEY`
   - React uses `process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY`

**Note:** `.env` file is gitignored for security. Use `.env.example` as template.

### 3. Start Both Servers

**Terminal 1 - Game Server:**
```bash
npm start
```

**Terminal 2 - Payment Server:**
```bash
node server/payment-server.js
```

## How It Works:

1. **Customer clicks a colored box** (yellow, green, or purple)
2. **Payment form opens** with package details
3. **Customer enters card details** (Stripe handles security)
4. **Payment processes** through Stripe
5. **Powerups are delivered** to the game
6. **Customer can continue playing** with new powerups!

## Test Cards (Stripe Test Mode):

- **Success:** `4242 4242 4242 4242`
- **Decline:** `4000 0000 0000 0002`
- **Exp Date:** Any future date (e.g., 12/25)
- **CVC:** Any 3 digits (e.g., 123)

## Package Details:

| Package | Price | Time Boosts | Hints | Skips |
|---------|-------|-------------|-------|-------|
| 🟡 Casual Fan | $1.99 | +5 | +2 | +1 |
| 🟢 Super Fan | $4.99 | +20 | +15 | +1 |
| 🟣 Fan Club Leader | $19.99 | +100 | +80 | +7 |

## Security Features:

✅ **PCI Compliant** - Stripe handles all card data
✅ **Secure Payments** - Industry-standard encryption
✅ **No Card Storage** - Your servers never see card numbers
✅ **Real-time Validation** - Instant payment confirmation

## Production Deployment:

1. ✅ **Keys now use environment variables** (secure and best practice)
2. Update `.env` with **live** Stripe keys (`sk_live_YOUR_KEY` and `pk_live_YOUR_KEY`)
3. Never commit `.env` to git (already in `.gitignore`)
4. Update webhook endpoints for production URLs
5. Enable Stripe webhooks for payment confirmations
6. Set up proper error logging and monitoring

Your payment system is now ready! Customers can purchase powerups by clicking the colored boxes in your beautiful store interface.
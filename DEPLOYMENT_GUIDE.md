# Deployment Guide - Spot the Difference Game

## Overview
This guide will help you deploy your payment server and game so users can play without running servers locally.

## Architecture
- **Payment Server** (Node.js) → Deploy to Render/Railway/Heroku
- **Game Frontend** (React) → Deploy to Netlify/Vercel or serve from build folder

---

## Step 1: Deploy Payment Server to Render

### 1.1 Push to GitHub (if not already)
```bash
git init
git add .
git commit -m "Ready for deployment"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin master
```

### 1.2 Deploy to Render
1. Go to [https://render.com](https://render.com) and sign up
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name:** `spot-difference-payments`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server/payment-server.js`
   - **Plan:** Free

5. **Add Environment Variable:**
   - Key: `STRIPE_SECRET_KEY`
   - Value: `your_live_secret_key_from_stripe_dashboard`

6. Click **"Create Web Service"**

7. **Copy your server URL** (e.g., `https://spot-difference-payments.onrender.com`)

### 1.3 Update Your Game
In your local `.env` file, update:
```
REACT_APP_PAYMENT_SERVER_URL=https://your-actual-url.onrender.com
```

Then rebuild your game:
```bash
npm run build
```

---

## Step 2: Deploy Game Frontend

### Option A: Netlify (Recommended for Static Sites)

1. Go to [https://netlify.com](https://netlify.com)
2. Drag and drop your `build` folder
3. Or connect GitHub for automatic deployments
4. **Add Environment Variables in Netlify:**
   - `REACT_APP_STRIPE_PUBLISHABLE_KEY` = your publishable key
   - `REACT_APP_PAYMENT_SERVER_URL` = your Render URL

### Option B: Vercel

```bash
npm install -g vercel
vercel
```

Add env vars in Vercel dashboard.

### Option C: Serve Build Folder Yourself

Upload the `build` folder to any web host (AWS S3, Azure, etc.)

---

## Alternative: Railway.app

If you prefer Railway over Render:

1. Go to [https://railway.app](https://railway.app)
2. **"New Project"** → **"Deploy from GitHub"**
3. Select your repository
4. Add environment variable: `STRIPE_SECRET_KEY`
5. Railway auto-detects Node.js and deploys
6. Copy your app URL

---

## Testing Production

1. Visit your deployed game URL
2. Try making a purchase with test card: `4242 4242 4242 4242`
3. Check Stripe Dashboard for payment

---

## Costs

- **Render Free Tier:** Server sleeps after 15 min inactivity (wakes on request)
- **Railway Free Tier:** $5 credit/month
- **Netlify/Vercel:** Free for small projects

---

## Security Checklist

✅ Environment variables set on hosting platform  
✅ `.env` file in `.gitignore`  
✅ Live Stripe keys used  
✅ CORS configured for your domain  
✅ HTTPS enabled (automatic on Render/Netlify)

---

Your game is now live! Users just visit the URL and play - no server setup needed! 🎮


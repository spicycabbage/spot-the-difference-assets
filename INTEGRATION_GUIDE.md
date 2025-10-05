# Spot the Difference Game - Integration Guide

## Project Overview

This document explains how two separate projects work together:
1. **Spot the Difference Game** (this repo) - Standalone game with payments
2. **K-pop Community Site** (separate repo) - Main community site that embeds the game

---

## Current Spot the Difference Game Architecture

### Tech Stack
- **Frontend**: React (TypeScript), deployed on **Vercel**
  - URL: `https://spot-the-difference-sandy.vercel.app`
- **Backend**: Node.js/Express, deployed on **Render**
  - URL: `https://spot-the-difference-assets.onrender.com`
- **Database**: Neon PostgreSQL (serverless)
- **Payments**: Stripe (live mode)

### How Payments Work (IMPORTANT - DO NOT BREAK!)

1. **User clicks "Buy Powerups"** → Opens Stripe Payment Link in new tab
2. **User pays on Stripe** → Stripe processes payment
3. **Stripe sends webhook** to `https://spot-the-difference-assets.onrender.com/webhook`
4. **Backend stores powerups** in Neon database (`pending_powerups` table) by `session_id`
5. **Stripe redirects user back** to game with `?session_id=XXX`
6. **Game claims powerups** by calling `/claim-powerups` with session_id
7. **Backend deletes claimed powerups** from database
8. **Powerups saved** in browser localStorage

### Payment Links (Live Production)
- Casual Fan ($0.99): `https://buy.stripe.com/dRmfZi4xYbo03ta77t6sw02`
- Super Fan ($4.99): `https://buy.stripe.com/8x214o2pQgIk4xe2Rd6sw01`
- Fan Club Leader ($19.99): `https://buy.stripe.com/00w9AU5C22Ru6FmgI36sw00`

### Environment Variables (Render Backend)
```
STRIPE_SECRET_KEY=sk_live_... (DO NOT EXPOSE)
STRIPE_WEBHOOK_SECRET=whsec_... (DO NOT EXPOSE)
DATABASE_URL=postgresql://... (Neon connection string)
```

### Environment Variables (Vercel Frontend)
```
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_...
REACT_APP_PAYMENT_SERVER_URL=https://spot-the-difference-assets.onrender.com
```

### Database Schema (Neon)

#### Table: `pending_powerups`
```sql
CREATE TABLE pending_powerups (
  session_id VARCHAR(255) PRIMARY KEY,
  powerups JSONB NOT NULL,
  email VARCHAR(255),
  product_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);
```
- Auto-cleanup: Deletes unclaimed powerups after 7 days
- Survives Render restarts

---

## K-pop Community Site Integration

### Current Integration (Simple - No Auth)

**Just embed with iframe:**
```html
<iframe 
  src="https://spot-the-difference-sandy.vercel.app"
  width="100%"
  height="800px"
  frameborder="0"
  allow="payment"
  title="Spot the Difference Game"
></iframe>
```

**That's it!** Game works independently:
- ✅ Payments work
- ✅ Powerups stored in browser
- ✅ No backend needed on K-pop site
- ✅ No user sync needed

---

## Future: Adding Leaderboards (Secure Implementation)

### Overview
When K-pop site has user authentication, you can add leaderboards that show scores from both sites.

### Architecture

```
┌─────────────────────┐
│ K-pop Community Site│
│  (Main Auth System) │
└──────────┬──────────┘
           │
           │ 1. User logs in
           │ 2. Gets JWT token
           │
           ├─────────────────────┐
           │                     │
           ▼                     ▼
    ┌──────────────┐      ┌─────────────┐
    │ Game (iframe)│      │ Leaderboard │
    │  Receives    │      │   Display   │
    │  JWT token   │      └─────────────┘
    └──────┬───────┘
           │
           │ 3. Submits score + JWT
           │
           ▼
    ┌──────────────────┐
    │ Shared Backend   │
    │ (Render/Neon)    │
    │ Verifies JWT     │
    │ Saves Score      │
    └──────────────────┘
```

### Step-by-Step Implementation

#### 1. Add Database Tables (Neon)

Add to existing Neon database (don't create new one!):

```sql
-- Users table (shared between K-pop site and game)
CREATE TABLE users (
  user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Game scores table
CREATE TABLE game_scores (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(user_id),
  score INTEGER NOT NULL,
  level INTEGER NOT NULL,
  time_taken INTEGER,
  differences_found INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index for leaderboard queries
CREATE INDEX idx_scores_leaderboard ON game_scores(score DESC, created_at DESC);
```

#### 2. K-pop Backend: Generate JWT Token

Install on K-pop backend:
```bash
npm install jsonwebtoken
```

When user logs into K-pop site:
```javascript
const jwt = require('jsonwebtoken');

// Secret key - MUST BE SHARED between K-pop backend and game backend
// Store in environment variables on both backends
const JWT_SECRET = process.env.JWT_SECRET; 

app.post('/api/auth/login', async (req, res) => {
  // ... validate user credentials ...
  
  // Create JWT token
  const token = jwt.sign(
    { 
      userId: user.id,
      username: user.username,
      email: user.email
    },
    JWT_SECRET,
    { expiresIn: '24h' } // Token valid for 24 hours
  );
  
  res.json({ token, user });
});
```

#### 3. K-pop Frontend: Pass Token to Game

When embedding game iframe:
```javascript
// K-pop site code
const iframe = document.getElementById('game-iframe');

// Wait for iframe to load
iframe.onload = () => {
  // Send user token to game
  iframe.contentWindow.postMessage({
    type: 'auth',
    token: userToken, // JWT from login
    userId: user.id,
    username: user.username
  }, 'https://spot-the-difference-sandy.vercel.app');
};
```

#### 4. Game: Receive Token

**Add to `src/App.tsx`:**

```typescript
useEffect(() => {
  // Listen for authentication from parent site
  const handleMessage = (event: MessageEvent) => {
    // Security: Verify origin
    if (event.origin !== 'https://your-kpop-site.com') {
      return;
    }
    
    if (event.data.type === 'auth') {
      // Store token and user info
      localStorage.setItem('authToken', event.data.token);
      localStorage.setItem('userId', event.data.userId);
      localStorage.setItem('username', event.data.username);
      console.log('User authenticated:', event.data.username);
    }
  };
  
  window.addEventListener('message', handleMessage);
  return () => window.removeEventListener('message', handleMessage);
}, []);
```

#### 5. Game: Submit Score with Token

**Add score submission function to `src/App.tsx`:**

```typescript
const submitScore = async (score: number, level: number, timeTaken: number) => {
  const token = localStorage.getItem('authToken');
  
  // Only submit if user is authenticated
  if (!token) {
    console.log('User not authenticated, score not saved');
    return;
  }
  
  try {
    const API_URL = process.env.REACT_APP_PAYMENT_SERVER_URL || 'http://localhost:3001';
    const response = await fetch(`${API_URL}/api/submit-score`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        score,
        level,
        timeTaken,
        differencesFound: foundDifferences.length
      })
    });
    
    if (response.ok) {
      console.log('Score submitted successfully!');
    }
  } catch (err) {
    console.error('Failed to submit score:', err);
  }
};

// Call this when level is completed
useEffect(() => {
  if (gameState === 'completed') {
    const score = calculateScore(); // Your scoring logic
    submitScore(score, currentLevel, timeElapsed);
  }
}, [gameState]);
```

#### 6. Backend: Add Score Endpoint

**Add to `server/payment-server.js`:**

```javascript
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET; // Same secret as K-pop backend!

// Middleware to verify JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { userId, username, email }
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
}

// Submit score endpoint
app.post('/api/submit-score', authenticateToken, async (req, res) => {
  const { score, level, timeTaken, differencesFound } = req.body;
  const userId = req.user.userId;
  
  // Validate score (prevent cheating)
  if (score < 0 || score > 100000) {
    return res.status(400).json({ error: 'Invalid score' });
  }
  
  if (level < 1 || level > 100) {
    return res.status(400).json({ error: 'Invalid level' });
  }
  
  try {
    // Save score to database
    await pool.query(
      'INSERT INTO game_scores (user_id, score, level, time_taken, differences_found) VALUES ($1, $2, $3, $4, $5)',
      [userId, score, level, timeTaken, differencesFound]
    );
    
    console.log(`✅ Score saved: User ${userId}, Score ${score}, Level ${level}`);
    res.json({ success: true });
  } catch (err) {
    console.error('Failed to save score:', err);
    res.status(500).json({ error: 'Failed to save score' });
  }
});

// Get leaderboard endpoint
app.get('/api/leaderboard', async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  
  try {
    const result = await pool.query(`
      SELECT 
        u.username,
        gs.score,
        gs.level,
        gs.created_at
      FROM game_scores gs
      JOIN users u ON gs.user_id = u.user_id
      ORDER BY gs.score DESC, gs.created_at DESC
      LIMIT $1
    `, [limit]);
    
    res.json({ leaderboard: result.rows });
  } catch (err) {
    console.error('Failed to fetch leaderboard:', err);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Get user's personal best
app.get('/api/user-best/:userId', async (req, res) => {
  const { userId } = req.params;
  
  try {
    const result = await pool.query(`
      SELECT MAX(score) as best_score, MAX(level) as highest_level
      FROM game_scores
      WHERE user_id = $1
    `, [userId]);
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Failed to fetch user best:', err);
    res.status(500).json({ error: 'Failed to fetch user stats' });
  }
});
```

#### 7. K-pop Site: Display Leaderboard

```javascript
// K-pop site code
async function loadLeaderboard() {
  const response = await fetch('https://spot-the-difference-assets.onrender.com/api/leaderboard?limit=10');
  const data = await response.json();
  
  // Display leaderboard
  data.leaderboard.forEach((entry, index) => {
    console.log(`${index + 1}. ${entry.username}: ${entry.score} points (Level ${entry.level})`);
  });
}
```

---

## Security Considerations

### ✅ What's Secure
- JWT tokens signed with secret key (can't be faked)
- Backend verifies token before accepting scores
- Score validation (prevents impossible scores)
- HTTPS everywhere
- Stripe handles payment security

### ⚠️ Additional Security Recommendations

1. **Rate Limiting**: Prevent spam submissions
```javascript
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);
```

2. **CORS**: Restrict which sites can call your API
```javascript
app.use(cors({
  origin: ['https://your-kpop-site.com', 'https://spot-the-difference-sandy.vercel.app'],
  credentials: true
}));
```

3. **Score Validation**: Check if score is achievable
```javascript
// Example: Max score per level is 1000 points
const MAX_SCORE_PER_LEVEL = 1000;
if (score > level * MAX_SCORE_PER_LEVEL) {
  return res.status(400).json({ error: 'Score too high for level' });
}
```

---

## Environment Variables Setup

### Render Backend (Game Backend)
```
# Existing (Payment System)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
DATABASE_URL=postgresql://...

# NEW (For Leaderboards)
JWT_SECRET=your-super-secret-key-min-32-chars  # MUST match K-pop backend!
```

### K-pop Backend
```
JWT_SECRET=your-super-secret-key-min-32-chars  # MUST match game backend!
DATABASE_URL=postgresql://...  # Same Neon database
```

### Vercel Frontend (Game)
```
# Existing
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_...
REACT_APP_PAYMENT_SERVER_URL=https://spot-the-difference-assets.onrender.com

# No changes needed for leaderboards (uses same backend)
```

---

## Testing the Integration

### 1. Test JWT Token Generation (K-pop Backend)
```bash
curl -X POST https://your-kpop-backend.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password"}'

# Should return: { "token": "eyJhbGc..." }
```

### 2. Test Score Submission (Game Backend)
```bash
curl -X POST https://spot-the-difference-assets.onrender.com/api/submit-score \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"score":5000,"level":5,"timeTaken":120}'

# Should return: { "success": true }
```

### 3. Test Leaderboard (Public)
```bash
curl https://spot-the-difference-assets.onrender.com/api/leaderboard?limit=10

# Should return: { "leaderboard": [...] }
```

---

## Deployment Checklist

When implementing leaderboards:

- [ ] Generate strong JWT_SECRET (32+ random characters)
- [ ] Add JWT_SECRET to both backends (K-pop + Game)
- [ ] Add database tables to Neon
- [ ] Update game backend with new endpoints
- [ ] Redeploy game backend to Render
- [ ] Update game frontend with postMessage listener
- [ ] Redeploy game frontend to Vercel
- [ ] Implement K-pop backend JWT generation
- [ ] Update K-pop frontend to pass JWT to iframe
- [ ] Test full flow: login → play → submit score → view leaderboard
- [ ] Monitor Render logs for errors

---

## Troubleshooting

### Scores not saving
1. Check browser console for errors
2. Verify JWT token is present: `localStorage.getItem('authToken')`
3. Check Render logs for authentication errors
4. Verify JWT_SECRET matches on both backends

### "Invalid token" error
- Token expired (24h limit) - user needs to re-login
- JWT_SECRET mismatch between backends
- Token not passed correctly via postMessage

### Leaderboard empty
- No scores submitted yet
- Database connection issue (check DATABASE_URL)
- Join query failing (verify users table exists)

---

## Important Notes for Future Developers

### 🚨 DO NOT MODIFY
- Payment webhook endpoint (`/webhook`) - payments will break!
- Database table `pending_powerups` - payments will break!
- Stripe Payment Links - configured with product metadata
- Environment variables on Render/Vercel without backing up first

### ✅ Safe to Modify
- Game UI/UX (React components)
- Add new API endpoints (don't change existing ones)
- Add new database tables (don't modify `pending_powerups`)
- Frontend scoring logic (as long as it calls `/api/submit-score`)

### 📞 If Something Breaks
1. Check Render logs: https://dashboard.render.com
2. Check Vercel logs: https://vercel.com
3. Check Neon database: https://console.neon.tech
4. Verify environment variables are set correctly

---

## Contact & Resources

- **Game Repo**: https://github.com/spicycabbage/spot-the-difference-assets
- **Game URL**: https://spot-the-difference-sandy.vercel.app
- **Backend URL**: https://spot-the-difference-assets.onrender.com
- **Stripe Dashboard**: https://dashboard.stripe.com
- **Neon Dashboard**: https://console.neon.tech
- **Render Dashboard**: https://dashboard.render.com

---

**Last Updated**: 2025-10-05
**System Status**: ✅ Production Ready (Payments Working, Neon Database Integrated)


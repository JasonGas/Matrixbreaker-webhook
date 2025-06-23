const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());

// Secret for protection
const MY_SECRET = process.env.MY_SECRET || 'YOUR_SECRET_KEY'; // fallback if not set

// Webhook endpoint
app.post('/', (req, res) => {
  const payload = req.body;

  // 🔐 Secret validation
  if (!payload || payload.secret !== MY_SECRET) {
    console.log('❌ Unauthorized webhook attempt:', payload?.secret);
    return res.status(403).send('Forbidden - Invalid Secret');
  }

  // ✅ Process trade signal
  console.log('📡 Signal received from TradingView:');
  console.log(JSON.stringify(payload, null, 2));

  // You can later route to AlgoWay or MT5 here
  res.status(200).send('✅ Webhook received');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 MatrixBreaker Webhook server running on port ${PORT}`);
});

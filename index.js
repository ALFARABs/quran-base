const express = require('express');
const cors = require('cors');
const NodeCache = require('node-cache');
const quranRoutes = require('./quran');
const jadwalRoutes = require('../../API-BASE/api/jadwal');
const hadistRoutes = require('../../API-BASE/api/hadist');
const doaRoutes = require('../../API-BASE/api/doa');

const app = express();
const cache = new NodeCache({ stdTTL: 3600, checkperiod: 600 }); // Cache 1 jam

// Middleware
app.use(cors());
app.use(express.json());

// Middleware untuk cache
app.use((req, res, next) => {
  const key = req.originalUrl;
  const cachedResponse = cache.get(key);
  
  if (cachedResponse) {
    return res.json(cachedResponse);
  }
  
  res.sendResponse = res.json;
  res.json = (body) => {
    cache.set(key, body);
    res.sendResponse(body);
  };
  
  next();
});

// Routes
app.use('/quran', quranRoutes);
app.use('/jadwal', jadwalRoutes);
app.use('/hadist', hadistRoutes);
app.use('/doa', doaRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({
    status: true,
    message: 'Islamic API is running',
    endpoints: {
      quran: '/api/quran',
      jadwal: '/api/jadwal',
      hadist: '/api/hadist',
      doa: '/api/doa'
    }
  });
});

module.exports = app;

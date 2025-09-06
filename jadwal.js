const express = require('express');
const axios = require('axios');
const router = express.Router();

const BASE_URL = 'https://api.myquran.com/v2/sholat';

// Get all cities
router.get('/kota/semua', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/kota/semua`);
    const cities = response.data.data;
    
    res.json({
      status: true,
      data: cities
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to fetch city list',
      error: error.message
    });
  }
});

// Get daily prayer schedule (segmented format)
router.get('/kota/:kotaId/tahun/:tahun/bulan/:bulan/tanggal/:tanggal', async (req, res) => {
  const { kotaId, tahun, bulan, tanggal } = req.params;
  
  try {
    const response = await axios.get(`${BASE_URL}/jadwal/${kotaId}/${tahun}/${bulan}/${tanggal}`);
    const schedule = response.data.data;
    
    res.json({
      status: true,
      data: schedule
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Failed to fetch prayer schedule for city ${kotaId}`,
      error: error.message
    });
  }
});

// Get monthly prayer schedule
router.get('/kota/:kotaId/tahun/:tahun/bulan/:bulan', async (req, res) => {
  const { kotaId, tahun, bulan } = req.params;
  
  try {
    const response = await axios.get(`${BASE_URL}/jadwal/${kotaId}/${tahun}/${bulan}`);
    const schedule = response.data.data;
    
    res.json({
      status: true,
      data: schedule
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Failed to fetch monthly prayer schedule for city ${kotaId}`,
      error: error.message
    });
  }
});

// Alternative daily prayer schedule (single date format)
router.get('/kota/:kotaId/tanggal/:date', async (req, res) => {
  const { kotaId, date } = req.params;
  
  try {
    const response = await axios.get(`${BASE_URL}/jadwal/${kotaId}/${date}`);
    const schedule = response.data.data;
    
    res.json({
      status: true,
      data: schedule
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Failed to fetch prayer schedule for city ${kotaId}`,
      error: error.message
    });
  }
});

module.exports = router;
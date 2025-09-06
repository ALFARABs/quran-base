const express = require('express');
const axios = require('axios');
const router = express.Router();

const BASE_URL = 'https://api.myquran.com/v2/quran';

// Get all surah list
router.get('/surat', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/surat`);
    const surahList = response.data.data;
    
    res.json({
      status: true,
      data: surahList
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to fetch surah list',
      error: error.message
    });
  }
});

// Get detail of a specific surah by id
router.get('/surat/:surahId', async (req, res) => {
  const { surahId } = req.params;
  
  try {
    const response = await axios.get(`${BASE_URL}/surat/${surahId}`);
    const surahDetail = response.data.data;
    
    res.json({
      status: true,
      data: surahDetail
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Failed to fetch surah ${surahId}`,
      error: error.message
    });
  }
});

// Get specific ayah of a surah
router.get('/ayat/:surahAyat', async (req, res) => {
  const { surahAyat } = req.params; // Format: surahId:ayahId
  
  try {
    const response = await axios.get(`${BASE_URL}/ayat/${surahAyat}`);
    const ayahDetail = response.data.data;
    
    res.json({
      status: true,
      data: ayahDetail
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Failed to fetch ayat ${surahAyat}`,
      error: error.message
    });
  }
});

// Get tafsir of a specific ayah
router.get('/tafsir/:surahAyat', async (req, res) => {
  const { surahAyat } = req.params; // Format: surahId:ayahId
  
  try {
    const response = await axios.get(`${BASE_URL}/tafsir/${surahAyat}`);
    const tafsirDetail = response.data.data;
    
    res.json({
      status: true,
      data: tafsirDetail
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Failed to fetch tafsir for ayat ${surahAyat}`,
      error: error.message
    });
  }
});

module.exports = router;
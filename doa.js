const express = require('express');
const axios = require('axios');
const router = express.Router();

const BASE_URL = 'https://api.myquran.com/v2/doa';

// Get all doa list
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    const doaList = response.data.data;
    
    res.json({
      status: true,
      data: doaList
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to fetch doa list',
      error: error.message
    });
  }
});

// Get specific doa by id
router.get('/:doaId', async (req, res) => {
  const { doaId } = req.params;
  
  try {
    const response = await axios.get(`${BASE_URL}/${doaId}`);
    const doaDetail = response.data.data;
    
    res.json({
      status: true,
      data: doaDetail
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Failed to fetch doa ${doaId}`,
      error: error.message
    });
  }
});

module.exports = router;
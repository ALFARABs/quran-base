const express = require('express');
const axios = require('axios');
const router = express.Router();

const BASE_URL = 'https://api.myquran.com/v2/hadits';

// Get list of hadith books
router.get('/kitab', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/kitab`);
    const bookList = response.data.data;
    
    res.json({
      status: true,
      data: bookList
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to fetch hadith books',
      error: error.message
    });
  }
});

// Get hadith list by book name
router.get('/kitab/:bookName', async (req, res) => {
  const { bookName } = req.params;
  
  try {
    const response = await axios.get(`${BASE_URL}/${bookName}`);
    const hadithList = response.data.data;
    
    res.json({
      status: true,
      data: hadithList
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Failed to fetch hadith list for book ${bookName}`,
      error: error.message
    });
  }
});

// Get specific hadith by book name and hadith number
router.get('/kitab/:bookName/:hadithNumber', async (req, res) => {
  const { bookName, hadithNumber } = req.params;
  
  try {
    const response = await axios.get(`${BASE_URL}/${bookName}/${hadithNumber}`);
    const hadithDetail = response.data.data;
    
    res.json({
      status: true,
      data: hadithDetail
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Failed to fetch hadith ${hadithNumber} from book ${bookName}`,
      error: error.message
    });
  }
});

module.exports = router;
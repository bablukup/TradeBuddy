const express = require("express");
const axios = require("axios");
const NodeCache = require("node-cache");
require("dotenv").config();

const router = express.Router();
const API_KEY = process.env.FINNHUB_API_KEY;
const cache = new NodeCache({ stdTTL: 10 }); // 10 seconds cache

// Function to fetch quote from Finnhub
async function fetchQuote(symbol) {
  try {
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching Finnhub quote:",
      error.response?.data || error.message
    );
    throw new Error("Failed to fetch data from Finnhub");
  }
}

// Route to get stock quote and send data formatted for UI
router.get("/quote/:symbol", async (req, res) => {
  let symbol = req.params.symbol;

  // Input validation
  if (!symbol || typeof symbol !== "string") {
    return res.status(400).json({ success: false, message: "Invalid symbol" });
  }

  const cacheKey = symbol.toUpperCase();

  // Check cache
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return res.json({
      success: true,
      symbol: cacheKey,
      data: cachedData,
      cached: true,
    });
  }

  // Fetch from Finnhub and format data for UI accordingly
  try {
    const rawData = await fetchQuote(cacheKey);

    // Format response data as required by UI component
    const formattedData = {
      price: rawData.c !== 0 ? rawData.c : "-", // current price
      percent:
        rawData.dp !== null && rawData.dp !== undefined
          ? rawData.dp.toFixed(2) + "%"
          : "-", // percent change
      isDown: rawData.dp < 0, // true if negative change
    };

    cache.set(cacheKey, formattedData); // store formatted data in cache

    res.json({
      success: true,
      symbol: cacheKey,
      data: formattedData,
      cached: false,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

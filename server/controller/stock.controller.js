const express = require('express');
const Stocks = require('../model/stock.model');
const router = express.Router();
const BASE_URI = '/stock'
const apiKey = process.env.API_KEY || '6183e3cb-6de7-47dc-b15b-385a835085b7'

router.post(BASE_URI + '/topStocks', async (req, res) => {
  try {
    // Your existing logic to fetch and store coin data from the API
    const coinsData = await fetch(new Request("https://api.livecoinwatch.com/coins/list"), {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
        "x-api-key": apiKey,
      }),
      body: JSON.stringify({
        currency: "USD",
        sort: "rank",
        order: "ascending",
        offset: 0,
        limit: 5,
        meta: false,
      }),
    });
    const data = await coinsData.json();
    let result = [];
    for (let coin of data) {
      let filtered_data = {
        code: coin.code,
        rate: coin.rate
      };
      result.push(filtered_data);
    }
    await Stocks.insertMany(result);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error fetching coin list:', error);
  }
});

router.post(BASE_URI + '/coins/details', async (req, res) => {
  try {
      const result = await Stocks.find({code: req.body.code}).sort({timestamp: -1}).limit(20);
      // console.log('List', result)
      res.status(200).json(result); // Send created user data with 201 Created status
  } catch (error) {
      res.status(500).json({ message: "Error getting stock details", error: error }); // Send user-friendly error message
  }
});

module.exports = router;
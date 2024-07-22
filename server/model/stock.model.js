const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    code: { type: String },
    rate: { type: Number },
    timestamp: { type: Number, default: Date.now } 
})

const Stocks = mongoose.model('Stocks', stockSchema);
module.exports = Stocks;
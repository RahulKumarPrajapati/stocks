require('dotenv').config()
const express = require('express');
const cors = require('cors');
const connectDB = require('./database');
const StockController = require('./controller/stock.controller');

const app = express();
const port = process.env.PORT || 8000

connectDB();
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}));
app.use(express.json());  // Add this line to enable JSON body parsing


app.get('/', (req, res) => {
    console.log('Hello')
    return res.status(200).send("success")
})

app.use('/api', StockController);


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
})
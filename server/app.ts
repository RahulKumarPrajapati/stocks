import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import connectDB from './database';
import StockController from './controller/stock.controller';

dotenv.config();

const app:any = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 8000;

connectDB();

app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}));
app.use(express.json());  // Add this line to enable JSON body parsing

app.use('/api', StockController);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
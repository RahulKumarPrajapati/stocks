import { Schema, model, Document } from 'mongoose';

interface Stock extends Document {
    code: string;
    rate: number;
    timestamp: number;
}

const stockSchema: Schema = new Schema({
    code: { type: String },
    rate: { type: Number },
    timestamp: { type: Number, default: Date.now } 
})

const Stocks = model<Stock>('Stocks', stockSchema);
export default Stocks;
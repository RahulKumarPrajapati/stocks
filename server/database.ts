import mongoose, { Connection } from 'mongoose';

function connectDB(): void {
    const url:any = process.env.MONGO_URI;
    mongoose.connect(url);

    const db: Connection = mongoose.connection;

    db.on('error', (err: Error) => {
        console.log(`Connection error: ${err}`);
    });

    db.once('open', () => {
        console.log('Connected to MongoDB');
    });
}

export default connectDB;
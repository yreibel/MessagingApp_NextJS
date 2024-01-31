import mongoose from 'mongoose';

export const connectMongo = async() => {

    mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/db1`);
    
}
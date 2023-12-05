import mongoose from 'mongoose';

let isConnected = false; 

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(!process.env.MONGODB_URL) return console.log('MONGODB_URL not found!');
    if(isConnected) return console.log("MONGODB already is connected");

    try {
        await mongoose.connect(process.env.MONGODB_URL);
        isConnected = true;
        console.log("CONNECTED TO MONGODB");
    } catch (e) {
        console.log(e)
    }
}
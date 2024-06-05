import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: '../.env' });

const MONGO_URL = process.env.MONGO_URL;

console.log(`MONGO_URL: ${MONGO_URL}`);

export const initMongoDb = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(MONGO_URL);
        console.log("Conexion establecida");
    } catch (error) {
        console.log(error);
    }
};

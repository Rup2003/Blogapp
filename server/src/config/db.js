import mongoose from "mongoose";
import logger from "./logger.js";

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        logger.info("Mongodb connected succesfully");
        
    } catch (error) {
        logger.error(" Mongodb connection failed",error);
        process.exit(1);
    }
};

export default connectDB;
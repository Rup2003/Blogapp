import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectDB from "./config/db.js";
import logger from "./config/logger.js";

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    connectDB();
    logger.info(`Server running on ${PORT}`);
});

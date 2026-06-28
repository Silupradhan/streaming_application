import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.DATABASE_URL}/${DB_NAME}`)
        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {
        console.log("Error connecting to the database:", error);
    }
}

export default connectDB;
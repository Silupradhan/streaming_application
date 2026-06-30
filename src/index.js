import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/dbConnect.js";
import { app } from "./app.js";

dotenv.config({
    path: "./.env"
});


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 3002 ,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("Error connecting to the database",err);
})
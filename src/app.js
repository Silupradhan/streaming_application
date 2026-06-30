import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//allowing the cross origin requests
app.use(cors({
    origin : process.env.CLIENT_URL,
    credientials : true
}))

//express.json() is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json({Limit : "16kb"}));

//express.urlencoded() is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded({extended : true, Limit : "16kb"}));

// app.use(express.static("public"));


//cookie-parser is helpes to acess the data which is in the client browser and also set the data in to the cookie.
app.use(cookieParser());

export { app };
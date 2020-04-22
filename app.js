"use strict";

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import chalk from "chalk";
import logs from "morgan";
import cors from "cors";
import process from "process";
import dotenv from "dotenv";
import compression from "compression";
import config from "./src/config";
//import  Routes from "./src/helpers/route";

//api endpoints

//import authApi from "./src/api/auth";
//import forumApi from "./src/api/forum";




const app = express();


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.static(__dirname, {dotfiles: "allow"}));

app.enable("trust proxy");

//app.use(requestIP.mw());

//Enable cors 
app.use(cors());

// connect to database
mongoose.connect(config.mongo.uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

mongoose.connection.on("open", err => {
    if (err) console.log(chalk.red("Error connecting to database"));
    console.log(chalk.green("Connected to database successfully"));
});

  
// log to server to request to console.
app.use(logs("dev"));
//enable cors

app.use(cors());
app.use(compression());

//api endpoints
api.use(Routes.root, authApi);
api.use(Routes.root, forumApi);


//set the port
app.set("port", process.env.port || 3300);


//run the server 

app.litsen(app.get("port"), err => {
    if (err) console.log("server stopped due to " + err.message);
    console.log(chalk.green("server is running in port "+ app.get("port")));

});

module.exports = app;
"use strict";

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import chalk from "chalk";
import logs from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import requestIP from "request-ip";
import process from "process";
import compression from "compression";
import config from "./src/config";
import Routes from "./src/helpers/route";

//api endpoints

import authApi from "./src/api/auth";
import forumApi from "./src/api/forum";



const app = express();

// Initialize environment
dotenv.config();


app.use(express.static(__dirname, { dotfiles: "allow" }));

app.use(cors());
// Enable proxy x-Forwadded-*
app.enable("trust proxy");

// IP middleware
app.use(requestIP.mw());

// Connect to database
mongoose.connect(config.mongo.uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});


// Define json body reader

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connection.on("open", err => {
  if (err) console.log(chalk.red("Error connecting to database"));
  console.log(chalk.green("Connected to database successfully"));
});
  
// log to server to request to console.
app.use(logs("dev"));
//enable cors


app.use(compression());

//api endpoints

app.use(Routes.root, authApi);
app.use(Routes.root, forumApi);

//set the port
app.set("port", process.env.port || 3300);

//run the server 

app.listen(app.get("port"), err => {
    if (err) console.log("server stopped due to " + err.message);
    console.log(chalk.green("server is running in port "+ app.get("port")));

});

module.exports = app;
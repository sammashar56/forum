//import mongoose from "mongoose";
import bodyParser from "body-parser";
import express from "express";
import chalk from "chalk";
import logs from "morgan";
import cors from "cors";
import process from "process";
import dotenv from "dotenv";




import  Routes from "../src/helpers/route";

//api endpoints
import authApi from "./api/auth";
import forumApi from "./api/forum";
import api from "./api/forum";


const app = express();


dotenv.config();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.static(__dirname, {dotfiles: "allow"}));
app.enable("trust proxy");

app.use(requestIP.mw());

// connect to database

mongoose.connect(config.mongo.uri, {
    useNewUrlParser: true,
    useCreateIndex: true
});

mongoose.connection.on("open", err => {
    if (err) console.log(chalk.red("error connecting to database"));
    console.log(chalk.green("connected to database succesfully"));
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

export default app;
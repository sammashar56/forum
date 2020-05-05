import process from "process";
import dotenv from "dotenv";

dotenv.config();

const config = {
    mongo: {
        uri: process.env.DATABASE_URL
    },
    token:{
        token: process.env.TOKEN_secret
    } 
}

export default config; 
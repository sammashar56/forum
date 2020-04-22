import jwt from "jsonwebtokens";
import config from "../config";

import User from "../models/user";

const Tksecret = config.token.token


const authorize = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(403).json({
            auth: false,
            message: "login user"
        });
    }
    jwt.verify(token, Tksecret, (err, decoded) => {
        if (err)
            return res.status(500).json({
                auth: false,
                message: "failed to authenticate"
            });
      User.findOne({ email: decoded.data }, { password: 0}, (err,user) =>{
        if (err)
            return res.status(500).json({
                exists: false,
                message: "something went wrong in identifying you"
            });
        if(!user)
            return res.status(404).json({
                exists: false,
                message: "successfuly registered ,sign in"
            });
          req.user = user;
          next();
        });   
    });
};


export default authorize; 
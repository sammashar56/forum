import jwt from "jsonwebtoken";
import config from "../config";

const { token: { token }} = config;


export const jwtSignature = payload => {
    return jwt.sign(
        {
            data: payload
        },
        token
    )
}
export const jwtVerify = token => {
    try {
        return jwt.verify(token, token, (err, decoded) => {
            if (err) {
                throw {
                    error: err.name,
                    message: `invalid token, try again later`,
                    status: 400
                };
            }
            else {
                return decoded.data;
            }
        });
    } catch (err){
        throw {
            error: err.name,
            message: err.message,
            status: 400
        };
    }
};

export const loginJwt = payload => {
    return jwt.sign(
        {
            exp: Math.floor(Date.now() / 1000) + 60 * 3600 * 10,
            data: payload
        },
        token
    );
};

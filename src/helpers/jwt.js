import jwt from "jsonwebtokens";
import dotenv from "dotenv";

dotenv.config();
const Tksecret = prcess.env.TOKEN_secret

export const jwtSignature = payload => {
    return jwt.sign(
        {
            data :payload
        },
        Tksecret
    )
}
export const jwtVerify = token => {
    try {
        return jwt.verify(token, Tksecret, (err, decoded) => {
            if (err) {
                throw {
                    error:err.name,
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
        Tksecret
    );
};

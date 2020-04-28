import express from "express";
import Routes from "../helpers/route";

import {login, registerUser} from "../middlewares/user";

const api = express.Router();

api.post(Routes.auth.signup, registerUser);

api.post(Routes.auth.signin, login);


export default api;   
import express from "express";
import Routes from "../helpers/route";

import {login, registerUser} from "../middlewares/user";

const api = express.Router();

api.post(Routes.auth.signin, registerUser);

api.post(Routes.auth.login, login);


export default api; 
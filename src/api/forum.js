import express from 'express';
import Routes from "../helpers/route";

import {fetchForums,fetchSpecificforum,removeForum,editForum, addforum} from "../middlewares/forum";

//import {auth} from "../middlewares/routeprotection"
import routeprotector from "../middlewares/routeprotection";


const api = express.Router();
 
// getting all forums
api.get(Routes.forum.all, fetchForums);

//fetching own forums should be protected
api.get(Routes.forum.own_forums, routeprotector,  fetchSpecificforum);

// edit specific own forum protected

api.put(Routes.forum.update, routeprotector, editForum);

// deleting own forum protected

api.delete(Routes.forum.update, routeprotector, removeForum);

// adding own forum protected route

api.post(Routes.forum.add, routeprotector, addforum);

export default api;

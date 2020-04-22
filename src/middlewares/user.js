import {loginUser, createUser} from '../controllers/auth';

export const registerUser = (req, res, next) => {
//const domdomainain = req.protocol + "://" + req.get("host");
  const data = {
    ...req.body,
    domain
  };
  createUser(data)
    .then(response => {
      res.status(201).json({
        message: "registration Succesful",
        user: response
      });
    })
    .catch(err => {
      res.status(err.status || 400).json({
        message: err.message
      });
    });
};

export const login = (req, res, next) => {
    loginUser(req.body)
    .then(response => {
        res.status(200).json ({...response});
    })
    .catch(err => {
        res.status(err.status).json({ ...err});
    });
};







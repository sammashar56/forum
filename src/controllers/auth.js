import bcrypt from "bcrypt";
import valid from "validator";

import User from "../models/user";

export const createUser = async userParam => {
    //check email and user name in user
    if (valid.isEmpty(userParam.password)) {
        throw { 
            status: 400,
            message: "provide password"
        };
    }
    else if(!valid.isEmail(userParam.email)){
        throw {
            status: 400,
            message: `Email ${userParam.email} is not valid`
        };
    }
    else if (valid.isEmpty(userParam.email) && valid.isEmpty(userParam.name)) {
        throw { status: 400, message: "Email/Name should be provided" };
      } else if (!valid.isLength(userParam.password, { min: 6, max: 30 })) {
        throw {
          status: 400,
          message: "Password should be more than six characters"
        };
      } else if (!valid.equals(userParam.password, userParam.confirm)) {
        throw { status: 400, message: "Passwords do not match" };
      } else if (await User.findOne({ email: userParam.email })) {
        throw {
          status: 400,
          message: `Email ${userParam.email} has been used already`
        };
      } else {
        const user = new User(userParam);
        if (userParam.password) {
          user.password = bcrypt.hashSync(userParam.password, 10);
        }
    
        // Save the user
        await user.save();

        return user;
    }       
} 
export const loginUser = async userParam => {
  // Validate user
  if (!valid.isEmail(userParam.email)) {
    throw { status: 400, message: `Email ${userParam.email} is not valid` };
  } else if (!valid.isLength(userParam.password, { min: 6, max: 30 })) {
    throw {
      status: 400,
      message: "Password should be more than six characters"
    };
  } else {
    const user = await User.findOne({ email: userParam.email });

    if (user) { 
      if (bcrypt.compareSync(userParam.password, user.password)) {
        if (user) {
          return {
            token: loginJwt(user.email),
            refresh_token: refreshToken(user.email),
            message: "Logged in successfully"
          };
        } else {
          throw {
            status: 400,
            message: "Invalid email/password"
          };
        }
      } 
    }
  }
};




    



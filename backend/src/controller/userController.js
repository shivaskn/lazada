import userModel from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import { createToken } from "../middlewares/userMiddleware.js";
import jwt from 'jsonwebtoken'

// register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({
          success: false,
          message: "Details are missing",
        });
      }

    // checking email

    const emailExists = await userModel.findOne({ email });
    if (emailExists) {
      res.json({
        success: false,
        message: "User already exists",
      });
    }

    // validating email format & strong password

    if (!validator.isEmail(email)) {
      res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 6) {
      res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // hashing the password

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashPassword,
    });

    const user = await newUser.save();

    // generate token

    const token = createToken(user._id);

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// login
const loginUser = async (req, res) => {
  try {
    const {email,password} = req.body;
    
    // checking the email

    const checkEmail = await userModel.findOne({email})
    if(!checkEmail){
      res.json({
        success: false,
        message: "User doesn't exists",
      });
    }
   
    // checking password

    const isPasswordMatch = await bcrypt.compare(password,checkEmail.password);
     
    if(isPasswordMatch){
      const token = createToken(checkEmail._id)
      res.json({
        success:true,
        token
      })
    }else{
      res.json({
        success:false,
        message:'Invalid credentials'
      })
    }

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// admin login

const adminLogin = async (req, res) => {
  try {
    const {email,password} = req.body
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
      const token = jwt.sign(email+password,process.env.JWT_KEY);
      res.json({
        success:true,
        token
      })
    } else {
      res.json({
        success:false,
        message:"Invalid credentials"
      })
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { registerUser, loginUser, adminLogin };

// import User from "../Models/usermodel.js";
const User = require("../Models/usermodel.js");
// import { generateToken } from "../utils/generateToken.js";
const {generateToken} = require("../utils/generateToken.js");
const bcrypt = require("bcryptjs");

const register = async (req , res) =>{
    try {
        const {name , email , password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                success: false,
                message: "Email already exist"
            })
        }else{
            let hashedPassword = await bcrypt.hash(password , 10);
            await User.create({
                name,
                email,
                password: hashedPassword
            })
            return res.status(201).json({
                success: true,
                message: "Account succesfully created",
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(201).json({
            success: false,
            message: "Erorr occured",
        }) 
    }
}

const login = async (req , res) =>{
    try {
        const {email , password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            })
        }else{
            let passMatchStatus = await bcrypt.compare(password , user.password);
            if(passMatchStatus){
                generateToken(res , user , `Welcome back ${user.name}`);
            }
            else{
                return res.status(400).json({
                    success: false,
                    message: "Incorrect email or password"
                })
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(201).json({
            success: false,
            message: "Erorr occured",
        }) 
    }
}

module.exports = {register , login};
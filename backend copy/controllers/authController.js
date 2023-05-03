const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

//user Registration
const register = async (req,res)=>{
    try {

        //hashing password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password,salt)

        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hash,
            photo:req.body.photo
        })
        await newUser.save()  
        res.status(200).json({success:true , messasge:"user created successfully"})      
    } catch (error) {
        res.status(500).json({success:false , messasge:"failed to  create. Try again"})      
        
    }
}

//user login
const login = async (req,res)=>{
    const email = req.body.email
    try {
        const user= await User.findOne({email})

        //if user dosent exist
        if(!user){
            return res.status(404).json({success:false,messasge:"user not found"})
        }

        //compare password
        const checkCorrectPassword =await bcrypt.compare(req.body.password,user.password)

        //password if incoorect
        if(!checkCorrectPassword){
            return res.status(401).json({success:false , message:"incorrect email or password"})
        }

        const {password , role , ...rest} = user._doc

        //create jwt token
            const token = jwt.sign(
                {  id:user._id , role:user.role  },
                    process.env.JWT_SECRET_KEY,
                    {expiresIn:"15d"}
                )

                //set token in browser cookies and send the response to the client
                res.cookie('accessToken',token,{
                    httpOnly:true,
                    expires:token.expiresIn
                }).status(200).json({success:true , message:'Successfully Login',token,role,data:{...rest}})
    } catch (error) {
        res.status(500).json({success:false , message:"Failed to login"})
    }
}

module.exports = { register , login}  
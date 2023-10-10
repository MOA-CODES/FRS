const User = require('../models/user_M')
const mongoose = require('mongoose')
const customError = require('../middleware/customError') 
const {StatusCodes} = require('http-status-codes')

const register = async (req, res)=>{
    const {Fname, Lname, email, password} = req.body

    if((!Fname && !Lname && !email && !password) || (Fname == `` && !Lname == `` && !email == `` && !password == ``)){
        throw new customError ('Provide values for First Name, Last Name, Email and Password', StatusCodes.BAD_REQUEST);
    } 

    const user = await User.create({...req.body})

    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user:{userId:user._id,token,msg:`user ${user.Fname} ${user.Lname} created`}})

}

module.exports = {register}
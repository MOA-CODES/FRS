const User = require('../models/user_M')
const customError = require('../middleware/customError') 
const {StatusCodes} = require('http-status-codes')

const register = async (req, res)=>{
    const {Fname, Lname, email, password} = req.body

    if((!Fname && !Lname && !email && !password) || (Fname == `` && !Lname == `` && !email == `` && !password == ``)){
        throw new customError ('Provide values for First Name, Last Name, Email and Password', StatusCodes.BAD_REQUEST);
    } 

    const user = await User.create({...req.body})

    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user:{msg:`Created ${user.Fname} ${user.Lname}, as a User`,userId:user._id,token}})

}

const login = async (req, res) => {
    const {email, password} = req.body

    if((!email && !password)|| (email == `` && password == ``)){
        throw new customError('Email and Password Fields cannot be Empty', StatusCodes.BAD_REQUEST)
    }

    const user = await User.findOne({email})

    if(!user){
        throw new customError('User does not exist', StatusCodes.NOT_FOUND)
    }

    const verify = user.comparePSW(password)

    if (!verify){
        throw new customError('Invalid Credentials', StatusCodes.UNAUTHORIZED)
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({msg:'login successful',user:{userId:user._id, token}})
}

module.exports = {register, login}
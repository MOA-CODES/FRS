const User = require('../models/user_M')
const {StatusCodes} = require('http-status-codes')
const customError = require('../middleware/customError')

const getAll_Notifications = async(req, res) =>{
    const {userId} = req.user

    const user = await User.findById(userId)

    if(!user){
        throw new customError('Invalid Authentication', StatusCodes.UNAUTHORIZED)
    }

    res.status(StatusCodes.OK).json({Notifications:user.notifications})
}

module.exports = {getAll_Notifications}
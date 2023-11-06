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

const create_Notification = async(req, res) =>{ //a patch request
    const {userId, notification} = req.body 

    const date = new Date().toUTCString()

    notification = notification + ` ${date}`

    const user = await User.findByIdAndUpdate(userId, {'$push':{'notifications': notification}}, {new:true, runValidators:true} )

    res.status(StatusCodes.OK).json({msg:`Notifaction: ${notification} was sent to ${userId.Fname} ${userId.Lname} successfully`})
}

module.exports = {getAll_Notifications}
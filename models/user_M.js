const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({

    Fname:{
        type: String,
        required: [true, 'Provide a First name'],
        minlength: 3,
        maxlenght: 25,
    },
    Lname:{
        type: String,
        required: [true, 'Provide a Last name'],
        minlength: 3,
        maxlenght: 25,
    },
    email:{
        type: String,
        unique: true,
        required: [true, 'Provide an email address'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Provide a valid email address'
        ],
    },
    password:{
        type:String,
        required: [true, 'Provide a password'],
        match:[
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/,
            'Password length should be >6 & have at least one lowercase, uppercase & special character'
        ],
    },
    notifications:{
        type:[String],
    },
    friends:{
        type: [mongoose.Types.ObjectId],
        ref: 'User',
        unique: true,
    },
    requests:{ //if accepted added to friends, then deleted from requests. only deleted if declined.
        type:[mongoose.Types.ObjectId],
        ref: 'User',
        unique: true,
    }


},{timestamps:true})

userSchema.pre('save', async function(){
    this.friends.push(this._id)

    const date = new Date().toUTCString()

    this.notifications.push(`Welcome to FRS ${this.Fname} ${this.Lname}. ${date}`) //test

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.comparePSW = async function(psw){
    const compare = await bcrypt.compare(psw, this.password)
    return compare
}

userSchema.methods.createJWT = function(){
    return jwt.sign({userId:this._id}, process.env.KEY, {expiresIn:process.env.JWT_LIFETIME})
}

module.exports = mongoose.model('User', userSchema)
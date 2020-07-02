const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const Room = require('../models/Room');

const userSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:true, 
        trim:true
    }, 
    email: {
        type:String,
        unique:true, 
        required:true, 
        trim:true, 
        lowercase:true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    }, 
    password:{
        type:String, 
        required:true, 
        minlength:7, 
        trim:true, 
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('password can\'t contain password')
            }
        }
    }, 
    tokens:[{
            token:{
                type:String,
                require:true
            }
        }
    ]},
    {
    timestamps:true
});

userSchema.virtual('rooms',{
    ref:'Room',
    localField: '_id',
    foreignField: 'teacher' 
});

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;
    return userObject;
};

userSchema.pre('save', async function (next){
    const user = this; 
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});


userSchema.methods.generateAuthToken = async function(){
    const user = this; 
    const token = jsonwebtoken.sign({_id:user._id.toString()}, process.env.JWT_SECRET); 

    if(!token){
        throw new Error('Failed generate token');
    }    

    user.tokens = user.tokens.concat({
        token
    });

    await user.save(); 
    return token;
}



userSchema.statics.findbyCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login invalid email')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}; 


const User = mongoose.model('User', userSchema);
module.exports = User; 
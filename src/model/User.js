const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Age cannot be a negative number');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isLength(value, {min: 6, max: 16})){
                throw new Error('Password length must be between 6 and 16 characters');
            }
            if(value.includes('password')){
                throw new Error('Password mustn\'t contain the word password');
            }
        }
    }
});

userSchema.pre('save', function(next){ 
    const user = this;

    if(user.isModified('password')){
        bcrypt.hash(user.password, 8).then((hash) => {
            //console.log(hash);
            user.password = hash;
            next();
        }).catch((err) => {
            res.status(500).send(err);
        })
    }
    else{
        next();
    }

    //console.log(user.password);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
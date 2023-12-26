const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({

    email:{
        type: string,
        unique: true,
    },
    name: {
        type: string,
    },
    password:{
        type:string,
    },
    role:{
        type: mongoose.ObjectId,
        ref: 'role'
    }
},{timestamps:true})

userSchema.methods.generateToken = function (){
    let token ='';
    return token
}

modules.export = mongoose.model('user',userSchema);
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    pan:{
        type: String,
        required: true
    },
    address: {
        type: String
    },
    amount: {
        type: Number
    },
    phoneNo:{
        type: String,
        required: true
    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    mode:{
       type: String 
    },
    paymentRef: {
        type: String,
        default: ""
    },
    purpose:{
        type: String,
        default:""
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('users', UserSchema)
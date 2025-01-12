const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
       
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    image: {
        type: String,
        required: false // Made optional
    },
   
    resetPasswordToken:String,
    resetPasswordExpiresAt:Date,
    verificationToken:String,
    verificationTokenExpiresAt:Date,
   
}, {timestamps: true});


const User = mongoose.model("User", userSchema);
module.exports = User;
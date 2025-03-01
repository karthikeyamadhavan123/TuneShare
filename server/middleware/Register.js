const User=require('../models/userSchema.js');

const existingUser=async(req,res,next)=>{

    const {email} = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required." });
    }
    
    const existingUser=await User.findOne({email:email});
    if(existingUser){
        res.status(400).json({message:'User already exists, please log in'});

    }
    else{
        next();
    }

}

module.exports={
    existingUser
}
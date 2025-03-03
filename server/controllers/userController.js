const bcrypt = require("bcrypt");
const jwt = require("../jwt/jwt");
const User = require("../models/userSchema.js");
const cloudinary = require("cloudinary").v2; // Assuming Cloudinary is configured here
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const crypto = require("../utils/crypto.js");
const {
  welcomeEmail,
  sendVerificationEmail,
  sendResetEmailSuccessful,
} = require("../nodemailer/nodemailer.js");

const Register = async (req, res) => {
  try {
    const saltRounds = 10;
    const { firstName, email, password,lastName='',gender,age,country } = req.body;
    let {preferences}=req.body
    if (!firstName || !email || !password || !gender || !age || !country || !preferences) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const verificationToken = crypto.generateToken(16);
    let imageUrl;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "user_images", // You can adjust the folder as per your need
        resource_type: "image", // Specify the resource type as image
        allowed_formats: ["jpeg", "jpg", "png"], // Allow only image formats
      });
      imageUrl = result.secure_url;
    }
     preferences = preferences.split(",").map((preference)=>preference.trim())    
    
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gender:gender,
      age:age,
      country:country,
      image: imageUrl,
      preferences:preferences,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // Token expires in 24 hours
    });
    await newUser.save();
    await welcomeEmail(newUser.email);
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required." });
    }

    // Hash the password
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(403).json({ message: "Passwords Not Matched." });
    }

    const userId = user._id;
    const token = jwt.createToken({ userId });
    const username = user.firstName;
    const user_image = user.image;
    res.cookie("login", token, {
      maxAge: 1000 * 60 * 60 * 2,
      httpOnly: true,
      path: "/",
    });
    // Send response with the new user data and token
    return res
      .status(200)
      .json({ username, userId, user_image, message: "Login successful" });
  } catch (error) {
    console.log(error); // Log the error for debugging
    return res.status(500).json({ success: false, error: error.message }); // Send a generic error message to the client
  }
};

const Logout = async (req, res) => {
  try {
    if (req.cookies["login"]) {
      res.clearCookie("login");
    }
    return res
      .status(200)
      .json({ success: true, message: "Logout Successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User Not Exist");
    }
    const token = crypto.generateToken(17);
    const resetPasswordTokenexpires = Date.now() + 1 * 60 * 60 * 1000;
    user.resetPasswordToken = token;
    user.resetPasswordExpiresAt = resetPasswordTokenexpires;
    await user.save();
    await sendVerificationEmail(user.email, token);
    return res
      .status(200)
      .json({
        message: "Reset Pssword Email Successfully sent",
        success: true,
        resetToken: token,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).send("ResetToken Expired Or not Provided");
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    user.password = hashedpassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    await user.save();
    await sendResetEmailSuccessful(user.email);
    return res
      .status(200)
      .json({ success: true, message: "Password Reset Successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

// const deleteUser=async(req,res)=>{
//     try {
//         const {userId}=req.params;

//         if(!userId){
//             return res.status(401).send('userid not present')
//         }
//         const user=await User.findById(userId);
//         const email=user.email
//         const username=user.username
//         if(!user){
//             return res.status(404).send('user not present')

//         }
//         await User.findByIdAndDelete(userId);
//         await sendAccountDeletionEmail(email,username)

//         return res.status(200).send('user deleted successfully')
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({success:false,message:error.message});
//     }
// }
// const getCurrentUserImage = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         if (!userId) {
//             return res.status(400).json({ message: "userId is required." });

//         }
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(400).json({ message: "user not  present." });
//         }
//         const image=user.image;

//         return res.status(200).json({ userimage: image });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message:error.message,success:false})
//     }
// }
module.exports = {
  Register,
  Login,
  Logout,
  forgotPassword,
  resetPassword,
  // deleteUser,
  // getCurrentUserImage
};

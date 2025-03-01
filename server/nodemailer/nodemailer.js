const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Gmail SMTP server
  port: 587, // Port for TLS/STARTTLS
  secure: false, // false for TLS/STARTTLS, true for SSL (port 465)
  auth: {
    user: process.env.NODEMAILER_EMAIL, // your email from environment variables
    pass: process.env.NODEMAILER_PASS, // your app password from environment variables
  },
});

async function welcomeEmail(email) {
  try {
    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL, // sender address
      to: email, // receiver address
      subject: "Welcome to TuneShare!",
      text: `Welcome to TuneShare! Connect, Collaborate, and Explore with the most talented creators in the music world.`, // plain text body
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to TuneShare!</title>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #1e3c72, #2a5298); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 2.5em;">Welcome to TuneShare!</h1>
    <p style="color: #e0e0e0; font-size: 1.2em; margin-top: 10px;">Connect. Collaborate. Explore.</p>
  </div>
  <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Thank you for joining <strong>TuneShare</strong>, the ultimate platform for music talent! We're excited to have you as part of our creative community.</p>
    
    <div style="margin: 30px 0;">
      <div style="display: flex; align-items: center; margin-bottom: 15px;">
        <i class="fas fa-users" style="font-size: 24px; color: #1e3c72; margin-right: 10px;"></i>
        <span><strong>Connect</strong> with talented musicians and creators worldwide.</span>
      </div>
      <div style="display: flex; align-items: center; margin-bottom: 15px;">
        <i class="fas fa-handshake" style="font-size: 24px; color: #1e3c72; margin-right: 10px;"></i>
        <span><strong>Collaborate</strong> on exciting projects and bring your ideas to life.</span>
      </div>
      <div style="display: flex; align-items: center; margin-bottom: 15px;">
        <i class="fas fa-compass" style="font-size: 24px; color: #1e3c72; margin-right: 10px;"></i>
        <span><strong>Explore</strong> new opportunities and grow your musical journey.</span>
      </div>
    </div>

    <p>Ready to get started? Click the button below to visit TuneShare and upload your first audio or video clip:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${process.env.CLIENT_URL}" style="background-color: #1e3c72; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 1.1em;">
        <i class="fas fa-arrow-right" style="margin-right: 10px;"></i>Visit TuneShare
      </a>
    </div>

    <p>If you have any questions or need assistance, feel free to reach out to our support team at <a href="mailto:support@tuneshare.com" style="color: #1e3c72; text-decoration: none;">support@tuneshare.com</a>.</p>
    <p>Best regards,<br><strong>The TuneShare Team</strong></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>`,
    });
    return info;
  } catch (error) {
    console.error("Error sending email: ", error);
  }
}

async function sendVerificationEmail(email, token) {
  try {
    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: "Reset Your TuneShare Password",
      text: `You requested a password reset for your TuneShare account. Use this token to reset your password: ${token}`,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your TuneShare Password</title>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #1e3c72, #2a5298); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 2.5em;">Reset Your TuneShare Password</h1>
    <p style="color: #e0e0e0; font-size: 1.2em; margin-top: 10px;">Connect. Collaborate. Explore.</p>
  </div>
  <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
    <p>Hello music lover,</p>
    <p>We received a request to reset your TuneShare password. If you didn't make this request, you can safely ignore this email.</p>
    <p>To reset your password and get back to sharing your favorite tunes, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${process.env.CLIENT_URL}/api/reset-password/${token}" style="background-color: #1e3c72; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 1.1em;">
        <i class="fas fa-key" style="margin-right: 10px;"></i>Reset Password
      </a>
    </div>
    <p>This link will expire in <strong>1 hour</strong> for security reasons.</p>
    <p>Keep the music playing!<br>The TuneShare Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>`,
    });
    return info;
  } catch (error) {
    console.error("Error sending email: ", error);
  }
}
async function sendResetEmailSuccessful(email) {
  try {
    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: "Your TuneShare Password Has Been Reset",
      text: `Your TuneShare password has been successfully reset. You can now log in with your new password.`,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #1e3c72, #2a5298); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 2.5em;">Password Reset Complete!</h1>
    <p style="color: #e0e0e0; font-size: 1.2em; margin-top: 10px;">Connect. Collaborate. Explore.</p>
  </div>
  <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
    <p>Hello TuneShare member,</p>
    <p>Great news! Your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #1e3c72; color: white; width: 60px; height: 60px; line-height: 60px; border-radius: 50%; display: inline-block; font-size: 30px;">
        <i class="fas fa-check"></i>
      </div>
    </div>
    <p>If you didn't request this password reset, please contact our support team immediately at <a href="mailto:support@tuneshare.com" style="color: #1e3c72; text-decoration: none;">support@tuneshare.com</a>.</p>
    <p>To keep your music collection secure, we recommend:</p>
    <ul style="list-style-type: none; padding-left: 0;">
      <li style="margin-bottom: 10px;"><i class="fas fa-music" style="color: #1e3c72; margin-right: 10px;"></i>Using a strong, unique password</li>
      <li style="margin-bottom: 10px;"><i class="fas fa-shield-alt" style="color: #1e3c72; margin-right: 10px;"></i>Enabling two-factor authentication in your account settings</li>
      <li style="margin-bottom: 10px;"><i class="fas fa-lock" style="color: #1e3c72; margin-right: 10px;"></i>Never sharing your password with others</li>
    </ul>
    <p>You're all set to get back to discovering and sharing amazing music!</p>
    <p>Rock on,<br>The TuneShare Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>`,
    });

    console.log("Email sent successfully:");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

async function sendAccountDeletionEmail(email, username) {
  try {
    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: "Your Account Has Been Deleted",
      text: `Dear ${username}, your account has been successfully deleted. We're sorry to see you go.`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Deleted</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #e74c3c, #c0392b); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Account Deleted</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Dear ${username},</p>
    <p>We're writing to confirm that your account has been successfully deleted as per your request.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #e74c3c; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>We're sorry to see you go. Here's what you need to know:</p>
    <ul>
      <li>Your personal information has been removed from our systems</li>
      <li>Any remaining account balance has been refunded (if applicable)</li>
      <li>You will no longer receive emails from us, except for this confirmation</li>
    </ul>
    <p>If you deleted your account by mistake or change your mind, please contact our support team within 30 days, and we may be able to restore your account.</p>
    <p>We appreciate the time you spent with us and hope to see you again in the future.</p>
    <p>Best regards,<br>Your ChaiCro Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`,
    });

    console.log("Account deletion email sent successfully:");
  } catch (error) {
    console.error("Error sending account deletion email:", error);
  }
}

// module.exports = { sendVerificationEmail, sendResetEmailSuccessful };
module.exports = {
  welcomeEmail,
  sendVerificationEmail,
  sendResetEmailSuccessful,
  sendAccountDeletionEmail,
};

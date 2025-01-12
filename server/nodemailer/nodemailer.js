const nodemailer = require("nodemailer");
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

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
          text: `Welcome to TuneShare! We're excited to have you join our creative community.`, // plain text body
          html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to TuneShare!</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #6a5acd, #483d8b); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Welcome to TuneShare!</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Thank you for signing up! We're thrilled to have you join our growing network of talented creators.</p>
    <p>TuneShare is the perfect place to showcase your musical and artistic skills. To get started, visit our platform and upload your first audio or video clip:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${process.env.CLIENT_URL}" style="background-color: #6a5acd; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Visit TuneShare</a>
    </div>
    <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
    <p>Best regards,<br>Your TuneShare Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>`
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
      subject: 'Reset Your Tune Share Password',
      text: `You requested a password reset for your Tune Share account. Use this token to reset your password: ${token}`,
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Tune Share Password</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(to right, #6366F1, #4F46E5); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Reset Your Tune Share Password</h1>
        </div>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
          <p>Hello music lover,</p>
          <p>We received a request to reset your Tune Share password. If you didn't make this request, you can safely ignore this email.</p>
          <p>To reset your password and get back to sharing your favorite tunes, click the button below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.CLIENT_URL}/api/reset-password/${token}" style="background-color: #6366F1; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
          </div>
          <p>This link will expire in 1 hour for security reasons.</p>
          <p>Keep the music playing!<br>The Tune Share Team</p>
        </div>
        <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
          <p>This is an automated message, please do not reply to this email.</p>
        </div>
      </body>
      </html>
      `
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
      subject: 'Your Tune Share Password Has Been Reset',
      text: `Your Tune Share password has been successfully reset. You can now log in with your new password.`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #6366F1, #4F46E5); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Complete!</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello Tune Share member,</p>
    <p>Great news! Your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #6366F1; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you didn't request this password reset, please contact our support team immediately at support@tuneshare.com</p>
    <p>To keep your music collection secure, we recommend:</p>
    <ul style="list-style-type: none; padding-left: 0;">
      <li style="margin-bottom: 10px;">🎵 Using a strong, unique password</li>
      <li style="margin-bottom: 10px;">🎸 Enabling two-factor authentication in your account settings</li>
      <li style="margin-bottom: 10px;">🎼 Never sharing your password with others</li>
    </ul>
    <p>You're all set to get back to discovering and sharing amazing music!</p>
    <p>Rock on,<br>The Tune Share Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`
    });

    console.log("Email sent successfully:");

  } catch (error) {
    console.error("Error sending email:", error);
  }
}


async function sendShopCreationEmail(email, shopName) {
  try {
    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'Congratulations! Your Shop Has Been Created',
      text: `Congratulations! Your shop "${shopName}" has been successfully created.`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shop Creation Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Shop Creation Successful</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We're excited to inform you that your shop "${shopName}" has been successfully created!</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        🏪
      </div>
    </div>
    <p>Here are some next steps to get you started:</p>
    <ul>
      <li>Customize your shop's appearance</li>
      <li>Add products to your inventory</li>
      <li>Set up your payment methods</li>
      <li>Share your shop link on social media</li>
    </ul>
    <p>If you need any assistance, don't hesitate to reach out to our support team.</p>
    <p>Best of luck with your new shop!</p>
    <p>Best regards,<br>Your ChaiCro  Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`
    });

    console.log("Shop creation email sent successfully:");

  } catch (error) {
    console.error("Error sending shop creation email:", error);
  }
}
async function sendProductCreationEmail(email, productName) {
  try {
    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'New Product Added Successfully',
      text: `Your new product "${productName}" has been successfully added to your shop.`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Product Added Successfully</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #3498db, #2980b9); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Product Added Successfully</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Great news! Your new product "${productName}" has been successfully added to your shop.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #3498db; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        📦
      </div>
    </div>
    <p>Here are some things you might want to do next:</p>
    <ul>
      <li>Double-check the product details and pricing</li>
      <li>Add more high-quality images if needed</li>
      <li>Create a special promotion for your new product</li>
      <li>Share the product on your social media channels</li>
    </ul>
    <p>Remember, you can always edit your product details from your shop dashboard.</p>
    <p>Happy selling!</p>
    <p>Best regards,<br>Your E-ChaiCro  Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`
    });

    console.log("Product creation email sent successfully:");

  } catch (error) {
    console.error("Error sending product creation email:", error);
  }
}

async function sendAccountDeletionEmail(email, username) {
  try {
    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'Your Account Has Been Deleted',
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
`
    });

    console.log("Account deletion email sent successfully:");

  } catch (error) {
    console.error("Error sending account deletion email:", error);
  }
}

// module.exports = { sendVerificationEmail, sendResetEmailSuccessful };
module.exports = { welcomeEmail ,sendVerificationEmail,sendResetEmailSuccessful,sendShopCreationEmail,sendProductCreationEmail,sendAccountDeletionEmail}
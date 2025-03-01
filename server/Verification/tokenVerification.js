const jwt = require('../jwt/jwt.js');
const cookieParser = require('cookie-parser');

function tokenVerification(req, res, next) {
    try {
        const cookie_token = req.cookies?.['login'];
        // console.log(' Cookies:', req.cookies);  // Log cookies for debugging

        if (!cookie_token) {
            return res.status(401).send('No token provided');
        }

        const secret = process.env.SECRET_KEY;
        const decoded = jwt.verifyToken(cookie_token, secret);  // Verify token
        // console.log('Decoded Token:', decoded);

        req.user = decoded;
        next();
    } catch (error) {
        console.log('Token Verification Error:', error);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}

module.exports = tokenVerification;

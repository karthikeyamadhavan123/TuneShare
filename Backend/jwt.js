const jwt=require('jsonwebtoken');
const secretKey='my_secret_code';

function generateToken(user){ // paylaod always important
    const payload={
        id:user.id,
        username:user.username,
        email:user.email
    } 
    return jwt.sign(payload,secretKey,{expiresIn:'1d'}); // this gives a generating token
}

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
   
    if (!authHeader) {
        return res.status(403).send('A token is required for authentication');
    }

    const token = authHeader.split(' ')[1]; // Extract token after 'Bearer '
    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
    } catch (error) {
        return res.status(401).send('Invalid Token');
    }
    next();
}

module.exports = {
    generateToken,
    verifyToken
  };
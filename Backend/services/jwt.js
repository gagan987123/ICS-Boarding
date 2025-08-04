const jwt = require('jsonwebtoken');

// Generate JWT token from user data
const generateToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        photo: user.photo,
        provider: user.provider
    };
    
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7d'
    });
};


module.exports = {
    generateToken
};

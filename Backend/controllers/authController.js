const { generateToken } = require('../services/jwt');

const googleCallback = (req, res) => {
    try {
        const jwtToken = generateToken(req.user);
        
        res.json({
            success: true,
            message: 'Authentication successful',
            token: jwtToken,
            user: {
                id: req.user.id,
                name: req.user.name,
                email: req.user.email,
                photo: req.user.photo,
                provider: req.user.provider
            }
        })
        
    } catch (error) {
        console.error('JWT generation error:', error);
        res.status(500).json({
            success: false,
            message: 'Error generating authentication token',
            error: error.message
        });
    }
};

const loginFailed = (req, res) => {
    res.status(401).json({
        success: false,
        message: 'Google authentication failed'
    });
};

module.exports = {
    googleCallback,
    loginFailed
};

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Access token required. Please provide Bearer token in Authorization header.'
            });
        }
        
        const token = authHeader.substring(7); // Remove 'Bearer ' prefix
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decoded; // Attach decoded user info to request
        next();
        
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: 'Invalid or expired JWT token',
            error: error.message
        });
    }
};

module.exports = {
    verifyToken
};
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.status(401).json({
            'message': "Authentication failed",
            'data': []
        });

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err)
            return res.status(403).json({
                'message': "Authorization failed",
                'data': []
            });
        req.user = await User.findById(user.userId); // Add user object to request
        next();
    });
};

module.exports = {
    authenticateToken
};

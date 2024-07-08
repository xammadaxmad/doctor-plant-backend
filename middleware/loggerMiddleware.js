const fs = require('fs');

const logCalls = async (req, res, next) => {
    let message = `[${new Date().toISOString()}] ${req.method} ${req.url}`
    console.log(message)
    next(); // Call the next middleware or route handler
};


module.exports = {
    logCalls
};
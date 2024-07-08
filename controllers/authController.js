const authService = require('../services/authService');
const response = require("../utils/response")

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = await authService.register({ username, email, password });
        res.status(201).json(response.forge("User has been registered",newUser));
    } catch (error) {
        console.log(error)
        res.status(400).json(response.forge(error.message));
    }
};  

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await authService.login({ email, password });
        res.json(response.forge("You have successfully logged in",{'token':token}));
    } catch (error) {
        res.status(401).json(response.forge(error.message));
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        await authService.forgotPassword(email);
        res.status(200).json(response.forge("New password has been sent to your Email. Please change that after login"));
    } catch (error) {
        res.status(400).json(response.forge(error.message));
    }
};

module.exports = {
    register,
    login,
    forgotPassword
};

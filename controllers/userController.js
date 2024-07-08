const userService = require('../services/userService');
const response = require("../utils/response")

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        await userService.forgotPassword(email);
        res.sendStatus(200);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming user is authenticated and userId is available in req.user
        const { username, email } = req.body;
        const updatedUser = await userService.updateUserProfile(userId, { username, email });
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const changePassword = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming user is authenticated and userId is available in req.user
        const { currentPassword, newPassword } = req.body;
        await userService.changePassword(userId, currentPassword, newPassword);
        res.status(200).json(response.forge("Password has been changed successfully"));
    } catch (error) {
        res.status(400).json(response.forge(error.message));
    }
};

module.exports = {
    forgotPassword,
    updateUserProfile,
    changePassword
};

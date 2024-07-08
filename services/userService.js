const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { sendEmail } = require('../utils/emailUtils');

const forgotPassword = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');

    const newPassword = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    await sendEmail(user.email, 'Password Reset', `Your new password is: ${newPassword}`);

    return true;
};

const updateUserProfile = async (userId, { username, email }) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    user.username = username || user.username;
    user.email = email || user.email;
    return await user.save();
};

const changePassword = async (userId, currentPassword, newPassword) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) throw new Error('Current password is incorrect');

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    return true;
};

const generateRandomPassword = () => {
    return Math.random().toString(36).slice(-8);
};

module.exports = {
    forgotPassword,
    updateUserProfile,
    changePassword
};

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendEmail } = require('../utils/emailUtils');

const register = async ({ username, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        is_logged_in: false
    });
    return await newUser.save();
};

const login = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');
    user.is_logged_in = true
    user.save()

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};

const forgotPassword = async (email) => {
    console.log(email)
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');

    const newPassword = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    await sendEmail(user.email, 'Password Reset', `Your new password is: ${newPassword}`);

    return true;
};

const generateRandomPassword = () => {
    return Math.random().toString(36).slice(-8);
};

module.exports = {
    register,
    login,
    forgotPassword
};

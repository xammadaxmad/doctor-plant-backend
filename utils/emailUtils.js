const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, message) => {
    const transporter = nodemailer.createTransport({
        host: '',  // Your SMTP server hostname
        port: 587,                 // SMTP port (usually 587 for TLS, 465 for SSL, 25 for non-encrypted)
        secure: false,             // True for 465, false for other ports
        auth: {
            user: '',    // Your email address
            pass: ''         // Your password
        }
    }
    );

    const mailOptions = {
        from: '',
        to,
        subject,
        text: message
    };

    await transporter.sendMail(mailOptions);
};

module.exports = {
    sendEmail
};

const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, message) => {
    const transporter = nodemailer.createTransport({
        host: 'mail.softmatics.com',  // Your SMTP server hostname
        port: 587,                 // SMTP port (usually 587 for TLS, 465 for SSL, 25 for non-encrypted)
        secure: false,             // True for 465, false for other ports
        auth: {
            user: 'konnekt.qa@softmatics.com',    // Your email address
            pass: 'p76!ePewMds6x'         // Your password
        }
    }
    );

    const mailOptions = {
        from: 'konnekt.qa@softmatics.com',
        to,
        subject,
        text: message
    };

    await transporter.sendMail(mailOptions);
};

module.exports = {
    sendEmail
};

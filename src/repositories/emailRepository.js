const nodemailer = require('nodemailer');

const SMTP_CONFIG = require('../../config/smtp');

const transporter = nodemailer.createTransport({
    host: SMTP_CONFIG.host,
    port: SMTP_CONFIG.port,
    secure: false,
    auth: {
        user: SMTP_CONFIG.user,
        pass: SMTP_CONFIG.pass
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = {
    async sendEmail({
        text = null,
        subject = null,
        from = null,
        to = null,
        html = null
    } = {}) {
        const mailSent = await transporter.sendMail({
            text,
            subject,
            from,
            to,
            html
        });
        console.log(mailSent);
    }
};

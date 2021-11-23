const { transporter } = require('../utils/emailClient')

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

const { sendEmail } = require('../repositories/emailRepository');

module.exports = {
    async sendTokenToEmail(token, emailDestination) {
        let emailContent = {
            text: `Here is your code: ${token}`,
            subject: 'Confirm your identity on chatbot',
            from: 'Joao Soares <joao.dev.tester@gmail.com>',
            to: [emailDestination],
            html: `
                    <html>
                    <body>
                        <strong>Here is your code: ${token}</strong></br>Do E-mail
                    </body>
                    </html> 
                `
        };
        sendEmail(emailContent);
    },
    async sendEmailExample() {
        let emailContent = {
            text: 'E-mail text here',
            subject: 'Subject Here',
            from: 'Joao Soares <joao.dev.tester@gmail.com>',
            to: ['joao.dev.tester@gmail.com'],
            html: `
                    <html>
                    <body>
                        <strong>Conteúdo HTML</strong></br>Do E-mail
                    </body>
                    </html> 
                `
        };
        sendEmail(emailContent);
    }
};

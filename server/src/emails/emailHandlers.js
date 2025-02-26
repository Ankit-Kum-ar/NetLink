const { mailtrapClient, sender } = require("../config/mailtrap");
const { createWelcomeEmailTemplate } = require("./emailTemplates");

const sendWelcomeEmail = async (email, name, profileUrl) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Welcome to NetLink",
            html: createWelcomeEmailTemplate(name, profileUrl),
            category: "Welcome Email",
        })
        console.log('Email sent:', response);
    } catch (error) {
        console.error('Error sending email:', error.message);        
    }
}

module.exports = {
    sendWelcomeEmail
}
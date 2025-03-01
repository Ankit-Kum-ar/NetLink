const { mailtrapClient, sender } = require("../config/mailtrap");
const { createWelcomeEmailTemplate, createCommentNotificationEmailTemplate } = require("./emailTemplates");

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

const sendCommentNotificationEmail = async (
    recipientEmail,
    recipientName,
    commenterName,
    postUrl,
    commentContent
) => {
    const recipient = [{ email: recipientEmail }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: `${commenterName} commented on your post`,
            html: createCommentNotificationEmailTemplate(
                recipientName,
                commenterName,
                postUrl,
                commentContent
            ),
            category: "Comment Notification Email",
        });
        console.log('Email sent:', response);
    } catch (error) {
        console.error('Error sending email:', error.message);
    }
}

module.exports = {
    sendWelcomeEmail,
    sendCommentNotificationEmail
}
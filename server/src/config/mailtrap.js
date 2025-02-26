const { MailtrapClient } = require("mailtrap");
require("dotenv").config();
const TOKEN = process.env.MAILTRAP_TOKEN;

const mailtrapClient = new MailtrapClient({
  token: TOKEN,
});

const sender = {
    email: process.env.SENDER_EMAIL,
    name: process.env.SENDER_NAME,
};

module.exports = { mailtrapClient, sender };
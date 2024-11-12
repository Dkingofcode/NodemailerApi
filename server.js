// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
require('dotenv').config();


app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.post('/send-email', async (req, res) => {
    const { email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail', // or any other email provider
        auth: {
            user: process.env.GMAIL_ACCOUNT,
            pass: process.env.GMAIL_PASSWORD
        }
    });

    try {
        await transporter.sendMail({
            from: process.env.GMAIL_ACCOUNT,
            to: email,
            subject: subject,
            text: message
        });
        res.status(200).send('Email sent successfully');
    } catch (error) {
        res.status(500).send('Error sending email');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

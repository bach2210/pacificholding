const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Configure mail transporter
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'pacificalcoorganics@gmail.com',
            pass: 'zskn sdzn doli fpjn'
        }
    });

    const mailOptions = {
        from: email,
        to: 'pacificalcoorganics@gmail.com',
        subject: `New Contact Message: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ error: 'Failed to send message.' });
    }
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

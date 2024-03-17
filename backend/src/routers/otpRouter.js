import express  from 'express';
const router = express.Router();
import cron  from 'node-cron';
import twilio  from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

// Twilio credentials
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const twilioPhoneNumber = process.env.twilioPhoneNumber;

// Initialize Twilio client
const client = twilio(accountSid, authToken);

// Function to send OTP via SMS
function sendOTPViaSMS(phoneNumber, otp) {
    client.messages.create({
        body: `Your OTP is: ${otp}`,
        from: twilioPhoneNumber,
        to: phoneNumber
    }).then(message => console.log(`OTP sent to ${phoneNumber}: ${message.sid}`))
    .catch(error => console.error(`Error sending OTP to ${phoneNumber}:`, error));
}

// Schedule a cron job to send OTP SMS after 2 minutes
cron.schedule('*/1 * * * *', () => {
    const phoneNumber = process.env.userPhone; // Specify the user's phone number
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate OTP
    sendOTPViaSMS(phoneNumber, otp); // Send OTP via SMS
});

export default router;

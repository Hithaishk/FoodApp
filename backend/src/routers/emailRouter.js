// import nodemailer from 'nodemailer';
// import { google } from 'googleapis';
// import { OAuth2Client }from 'google-auth-library';
// import { Router } from 'express';
// import cron from 'node-cron';
// const clientId = process.env.CLIENT_ID;
// const clientSecret = process.env.CLIENT_SECRET;
// const refreshToken = process.env.REFRESH_TOKEN;
// const emailAddress = process.env.EMAIL_ADDRESS;
// const recipientEmail = process.env.RECIPIENT_EMAIL;

// const router = Router();
// // Configure OAuth2 credentials
// const oAuth2Client = new OAuth2Client(
//     clientId,
//     clientSecret,
//     'https://developers.google.com/oauthplayground' // Redirect URI
// );

// oAuth2Client.setCredentials({
//     refresh_token: refreshToken
// });

// // Generate an access token
// async function getAccessToken() {
//     const { token } = await oAuth2Client.getAccessToken();
//     return token;
// }

// // Create a nodemailer transporter using OAuth2 authentication
// const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         type: 'OAuth2',
//         user: emailAddress,
//         clientId: clientId,
//         clientSecret: clientSecret,
//         refreshToken: refreshToken,
//         accessToken: getAccessToken()
//     }
// });

// // Function to send email
// async function sendEmail() {
//     const mailOptions = {
//         from: emailAddress,
//         to: recipientEmail,
//         subject: 'Test Email',
//         text: 'This is a test email sent using OAuth2 authentication.'
//     };

//     try {
//         const info = await transporter.sendMail(mailOptions);
//         console.log('Email sent:', info.response);
//     } catch (error) {
//         console.error('Error sending email:', error);
//     }
// }
// // Define the route for scheduling emails
// router.get('/schedule-email', async (req, res) => {
//     try {
//         // Schedule the sendEmail function to run once after 1 minute
//         cron.schedule('*/1 * * * *', async () => {
//             try {
//                 await sendEmail();
//                 console.log('Scheduled email sent successfully.');
//             } catch (error) {
//                 console.error('Error sending scheduled email:', error);
//             }
//         }, {
//             scheduled: false // Don't start immediately, let it start after 1 minute
//         });

//         res.send('Email scheduled successfully.');
//     } catch (error) {
//         console.error('Error scheduling email:', error);
//         res.status(500).send('Error scheduling email.');
//     }
// });

// // module.exports = router;
// export default router;
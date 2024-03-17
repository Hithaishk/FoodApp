import dotenv from 'dotenv';
dotenv.config();
import { fileURLToPath } from 'url';
import express from 'express';
import foodRouter from './routers/food.router.js';
import userRouter from './routers/user.router.js';
import orderRouter from './routers/order.router.js';
import uploadRouter from './routers/upload.router.js';
import cookieSession from "cookie-session";
import bodyParser from 'body-parser';
import passport from "passport";
import authRoute from "./routers/auth.js";
import weatherRouter from './routers/weatherRouter.js';
import emailRouter from './routers/emailRouter.js';
import chartRouter from './routers/chartRouter.js';
import feedbackRouter from './routers/feedbackRouter.js';
import deliveryRouter from './routers/deliveryRouter.js';
import pinRouter from './routers/pinRouter.js';
import otpRouter from './routers/otpRouter.js'
import passportStrategy from "./passport";


import { dbconnect } from './config/database.config.js';
import path, { dirname } from 'path';
dbconnect();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());

app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

app.use('/api/foods', foodRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/upload', uploadRouter);
app.use("/auth", authRoute);
app.use('/weather', weatherRouter);
app.use('/emails', emailRouter);
app.use('/charts', chartRouter);
app.use('/feedback', feedbackRouter);
app.use('/delivery', deliveryRouter);
app.use('/pin', pinRouter);
app.use('/otp',otpRouter);

const publicFolder = path.join(__dirname, 'public');
app.use(express.static(publicFolder));

app.get('*', (req, res) => {
  const indexFilePath = path.join(publicFolder, 'index.html');
  res.sendFile(indexFilePath);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});

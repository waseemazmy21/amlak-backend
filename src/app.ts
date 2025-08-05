import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/db';
import errorMiddleware from './middlewares/errorMiddleware';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import { setupSwagger } from './config/swagger';
import passport from 'passport';
import './config/passport'

dotenv.config();

const app = express();

setupSwagger(app);

// app level middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(cookieParser());
app.use(passport.initialize())

// routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes);

// global error handler
app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`[Server] is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('[Server] failed to start:', error);
    process.exit(1);
  }
};

startServer();

app.get('/', (req, res) => {
  res.send('hello world*******');
});

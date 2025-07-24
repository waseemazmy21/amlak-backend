import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import errorMiddleware from './middlewares/errorMiddleware';
import authRoutes from './routes/authRoutes'

dotenv.config();

const app = express();

// app level middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use('/api', authRoutes)

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

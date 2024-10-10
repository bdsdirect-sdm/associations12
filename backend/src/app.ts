import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/db';
import authRoutes from './routes/authRoutes';
import upload from './middlewares/uploadMiddleware';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); // Serve static files

// Routes
app.use('/api/auth', authRoutes);

// File upload route (optional)
app.post('/api/upload', upload.single('file'), (req, res) => {
  return res.status(200).json({ message: 'File uploaded successfully', file: req.file });
});

// Database synchronization
db.sync().then(() => {
  console.log('Database synchronized');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;

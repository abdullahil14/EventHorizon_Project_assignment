require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const connectDB = require('./config/db');

const app = express();


const port = process.env.PORT || 7000;

// Middleware
app.use(express.json());

// DB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'EventHorizon API', version: '1.0.0' });
});

// Global error handler fallback
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const specs = require('./config/swagger');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check endpoint
app.get('/health', async (req, res) => {
  try {
    // Test database connection
    await db.query('SELECT 1');
    res.json({
      status: 'healthy',
      database: 'connected',
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date()
    });
  }
});

// Import routes
const authRoutes = require('./routes/auth');
const collegeRoutes = require('./routes/colleges');

// Use routes
app.use('/auth', authRoutes);
app.use('/', collegeRoutes);

// Add before your routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
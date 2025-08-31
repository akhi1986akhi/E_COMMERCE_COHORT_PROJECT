
const express = require('express');
const app = express();
const connectDB = require('./src/config/database');
const dotenv = require('dotenv');
    dotenv.config();
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Route imports
const userRoutes = require('./src/routes/userRoutes');


// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/users', userRoutes);

app.get("/",(req,res)=>{
    res.status(200).json({msg:'running successfully', status:true});
})

app.use( (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; 
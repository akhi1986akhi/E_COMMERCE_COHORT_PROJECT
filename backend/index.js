
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
    dotenv.config();
// const cors = require('cors');
// const helmet = require('helmet');
// const xss = require('xss-clean');
// const rateLimit = require('express-rate-limit');
// const mongoSanitize = require('express-mongo-sanitize');

// Route imports
const userRoutes = require('./src/routes/userRoutes');


// Security middleware
// app.use(helmet());
// app.use(xss());
// app.use(mongoSanitize());
// app.use(cors());
// app.use(express.json({ limit: '10mb' }));

// Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100 // limit each IP to 100 requests per windowMs
// });
// app.use(limiter);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/users', userRoutes);

// Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     success: false,
//     message: 'Something went wrong!',
//     error: process.env.NODE_ENV === 'production' ? {} : err.message
//   });
// });

// 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Route not found'
//   });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
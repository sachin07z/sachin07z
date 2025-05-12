const express = require('express');
const mongoose = require('mongoose');
const artworkRoutes = require('./routes/artworkRoutes');
const app = express();
const cartRoutes = require('./routes/cartRoutes');
app.use('/', cartRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/artGallery', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.set('view engine', 'ejs'); // Use EJS for templating
app.use(express.static('public')); // Serve static files
app.use(express.urlencoded({ extended: true })); // Parse form data

// Routes
app.use('/', artworkRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
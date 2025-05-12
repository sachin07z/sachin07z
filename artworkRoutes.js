const express = require('express');
const Artwork = require('../models/ArtShow');

const router = express.Router();

// Homepage
router.get('/', async (req, res) => {
  const artworks = await Artwork.find().limit(3); // Fetch 3 artworks for the homepage
  res.render('index', { artworks });
});

// Gallery
router.get('/gallery', async (req, res) => {
  const artworks = await Artwork.find(); // Fetch all artworks
  res.render('gallery', { artworks });
});

// Shop
router.get('/shop', async (req, res) => {
  const artworks = await Artwork.find(); // Fetch all artworks with prices
  res.render('shop', { artworks });
});

// About
router.get('/about', (req, res) => {
  res.render('about');
});

// Contact
router.get('/contact', (req, res) => {
  res.render('contact');
});

module.exports = router;
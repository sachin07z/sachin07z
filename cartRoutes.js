const express = require('express');
const Cart = require('../models/CartRoutes');
const Artwork = require('../models/ArtShow');
const router = express.Router();

// Add to Cart
router.post('/cart/add', async (req, res) => {
  const { artworkId } = req.body;
  const userId = 'guest'; // Replace with actual user ID after authentication

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const artwork = await Artwork.findById(artworkId);
    if (!artwork) {
      return res.status(404).json({ success: false, message: 'Artwork not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.artworkId.toString() === artworkId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({ artworkId, quantity: 1 });
    }

    await cart.save();
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get Cart
router.get('/cart', async (req, res) => {
  const userId = 'guest'; // Replace with actual user ID after authentication

  try {
    const cart = await Cart.findOne({ userId }).populate('items.artworkId');
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    res.json({ success: true, cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update Cart Item Quantity
router.post('/cart/update', async (req, res) => {
  const { artworkId, quantity } = req.body;
  const userId = 'guest'; // Replace with actual user ID after authentication

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.artworkId.toString() === artworkId);

    if (itemIndex > -1) {
      if (quantity > 0) {
        cart.items[itemIndex].quantity = quantity;
      } else {
        cart.items.splice(itemIndex, 1); // Remove item if quantity is 0
      }
    }

    await cart.save();
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
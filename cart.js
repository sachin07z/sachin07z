const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // For future user authentication
  items: [
    {
      artworkId: { type: mongoose.Schema.Types.ObjectId, ref: 'Artwork' },
      quantity: { type: Number, default: 1 },
    },
  ],
});

module.exports = mongoose.model('Cart', cartSchema);
const mongoose = require('mongoose');

const PicSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
);

module.exports = mongoose.model('Pic', PicSchema);
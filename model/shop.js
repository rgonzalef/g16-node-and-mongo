const mongoose = require('mongoose');

const { Schema } = mongoose;

const ShopSchema = Schema(
  {
    name: String,
    description: String,
    invoice_url: String,
    online: Boolean,
    address: String,
    phone_number: Number,
    contact_email: String,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

module.exports = mongoose.model('Shop', ShopSchema);

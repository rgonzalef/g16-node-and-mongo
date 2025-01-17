const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    gender: String,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

module.exports = mongoose.model('User', UserSchema);

'use strict'

const mongoose = require('mongoose');

const colorSchema = mongoose.Schema({
  twitter_handle: String,
  color: String
}, {
  timestamps: {
    createdAt: 'created at',
    updatedAt: 'updated at'
  }
});

const Color = mongoose.model('Color', colorSchema);

module.exports = Color;

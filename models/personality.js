'use strict';

const mongoose = require('mongoose');

const personalitySchema = mongoose.Schema({
  twitter_handle: String,
  color: String,
  raw_response: Object,
  api_version: String,
}, {
  timestamps: {
    createdAt: 'created at',
    updatedAt: 'updated at'
  }
});

const Personality = mongoose.model('Personality', personalitySchema);

module.exports = Personality;

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserNewsSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  headline: {
    type: String,
    required: true
  },
  rhymingHeadline: {
    type: String,
    required: true
  },
  bias: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true
  }
});

module.exports = UserNews = mongoose.model("user-news", UserNewsSchema);

const mongoose = require("mongoose");
const { isEmail } = require("validator");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return isEmail(value) && value.endsWith("@gmail.com");
      },
      message: "Please enter a valid Gmail address",
    },
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationCode: {
    type: String,
    default: null,
  },
});

module.exports = User = mongoose.model("user", UserSchema);

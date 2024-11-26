let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

// Define the User schema
let UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      default: "",
      trim: true,
      required: 'Username is required',
    },
    password: {
      type: String,
      default: "",
      trim: true,
      required: 'Password is required',
    },
    displayName: {
      type: String,
      default: "",
      trim: true,
      required: 'DisplayName is required',
    },
    Created: {
      type: Date,
      default: Date.now,
      trim: true,
    },
  },
  {
    collection: "users", // Collection configuration
  }
);

// Configure options for passport-local-mongoose
let options = { missingPasswordError: 'Missing or wrong password' };
UserSchema.plugin(passportLocalMongoose, options);

// Export the User model
module.exports.User = mongoose.model('User', UserSchema);

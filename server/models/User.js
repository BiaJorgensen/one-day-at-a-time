const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt');

// User model
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    }
});
  
// hash user password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});
  
// custom method to compare and validate password for logging in
userSchema.methods.verifyPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};
  
const User = model("User", userSchema);
  
module.exports = User;
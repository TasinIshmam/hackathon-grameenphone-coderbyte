const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

// create booking Schema and model
const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "E-mail is required"],
    unique: true,
    validate: [isEmail, "Invalid e-mail address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;

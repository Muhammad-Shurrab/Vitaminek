const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, default: "Anonymous" },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
      minlength: 8,
    },
    photo: { type: String, default: "eren" },
    wallet: { type: Number, default: 0 },
    isBanned: { type: Boolean, default: false },
    address: {
      street: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      zip: { type: String, default: "" },
      country: { type: String, default: "" },
    },
    phoneNumber: { type: String, default: "" },
    googleId: { type: String, default: "" },
    role: {
      type: String,
      enum: ["user", "trader", "admin"],
      required: true,
      default: "user", // Set default role to 'user'
    },
    purchasedDishes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Dish",
      },
    ], // Array of references to purchased product
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;

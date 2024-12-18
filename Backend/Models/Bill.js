const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BillSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: {
        type: String,
      },
      photos: [{ type: String }],
      name: String,
      quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity can not be less then 1."],
        default: 1,
      },
      price: Number,
    },
  ],
});

module.exports = Bill = mongoose.model("bill", BillSchema);

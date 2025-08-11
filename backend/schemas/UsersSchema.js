const { Schema, model } = require("mongoose");

const PortfolioItemSchema = new Schema({
  symbol: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
    default: 0,
  },
  avgPrice: {
    type: Number,
    required: true,
    default: 0,
  },
});

const UsersSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      default: 10000,
    },
    portfolio: { type: [PortfolioItemSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = UsersSchema;

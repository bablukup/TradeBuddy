const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

const { OrdersModel } = require("../model/OrdersModel");
const { HoldingsModel } = require("../model/HoldingsModel");
const UsersModel = require("../model/UsersModels");

//Trade create
router.post("/", authenticate, authorize("create_trade"), async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;
    const userId = req.user.id;

    const user = await UsersModel.findById(userId);
    if (!user) return res.status(400).json({ error: "User not found" });

    const totalValue = qty * price;
    if (mode === "buy") {
      if (user.balance < totalValue) {
        return res.status(400).json({ error: "Insufficient balance to buy" });
      }
      user.balance -= totalValue;
    } else if (mode === "sell") {
      const holding = await HoldingsModel.findOne({ userId, name });
      if (!holding || holding.qty < qty) {
        return res.status(400).json({ error: "Insufficient stocks to sell" });
      }
      user.balance += totalValue;
    } else {
      return res.status(400).json({ error: "Invalid trade mode" });
    }
    await user.save();

    let holding = await HoldingsModel.findOne({ userId, name });

    if (mode === "buy") {
      if (holding) {
        const newQty = holding.qty + qty;
        const newAvg = (holding.avg * holding.qty + price * qty) / newQty;
        holding.qty = newQty;
        holding.qty = newAvg;
      } else {
        holding = new HoldingsModel({
          userId,
          name,
          qty,
          avg: price,
          price,
          net: "0",
          day: "0",
        });
      }
    } else if (mode === "sell") {
      holding.qty -= qty;
      if (holding.qty <= 0) {
        await HoldingsModel.deleteOne({ userId, name });
        holding = null;
      } else {
        await holding.save();
      }
    }
    if (holding) await holding.save();

    const newOrder = new OrdersModel({
      userId,
      name,
      qty,
      price,
      mode,
    });
    await newOrder.save();

    res.json({
      message: "Order executed successfully",
      balance: user.balance,
      holding,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Server error" });
  }
});

// Cancel trade
router.delete(
  "/:id",
  authenticate,
  authorize("cancel_trade"),
  async (req, res) => {
    try {
      const Order = await OrdersModel.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.id,
      });

      if (!Order) {
        return res
          .status(404)
          .json({ message: "Order not found or not authorized" });
      }
      res.json({ message: `Trade ${req.params.id} cancelled successfully!` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// View portfolio
router.get(
  "/portfolio",
  authenticate,
  authorize("view_portfolio"),
  async (req, res) => {
    try {
      const portfolio = await HoldingsModel.find({ userId: req.user.id });
      res.json({ portfolio });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// View trade history
router.get(
  "/history",
  authenticate,
  authorize("view_trade_history"),
  async (req, res) => {
    try {
      const trades = await OrdersModel.find({ userId: req.user.id });
      res.json({ trades });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;

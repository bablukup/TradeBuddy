const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

const { OrdersModel } = require("../model/OrdersModel");
const { HoldingsModel } = require("../model/HoldingsModel");

//Trade create
router.post("/", authenticate, authorize("create_trade"), async (req, res) => {
  try {
    let newOrder = new OrdersModel({
      userId: req.user.id,
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });
    await newOrder.save();
    res.json({ message: "Order saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
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

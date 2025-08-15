const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const usersModel = require("../model/UsersModels");
const { HoldingsModel } = require("../model/HoldingsModel");

router.get("/", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await usersModel.findById(userId);
    if (!user) return res.status(404).json({ error: " User not found " });

    const availableCash = user.balance || 0;
    const holdings = await HoldingsModel.find({ userId });

    let holdingsValue = 0;
    let investment = 0;

    holdings.forEach((h) => {
      const avg = Number(h.avg) || 0;
      const ltp = Number(h.price) || 0;
      const qty = Number(h.qty) || 0;

      holdingsValue += ltp * qty;
      investment += avg * qty;
    });
    const pnl = holdingsValue - investment;
    const pnlPercent =
      investment > 0 ? ((pnl / investment) * 100).toFixed(2) : 0;

    res.json({
      equity: availableCash + holdingsValue,
      availableMargin: availableCash,
      usedMargin: 0, //  positions
      availableCash,
      openingBalance: user.balance,
      holdingsValue,
      investment,
      pnl,
      pnlPercent,
      payin: 0,
      span: 0,
      deliveryMargin: 0,
      exposure: 0,
      optionsPremium: 0,
      collateralLiquid: 0,
      collateralEquity: 0,
      totalCollateral: 0,
    });
  } catch (error) {
    console.error("Funds API Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

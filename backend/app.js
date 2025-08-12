const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const Cors = require("cors");
const dbUrl = process.env.ATLASDB_URL;

const authenticate = require("./middleware/authenticate");
const authorize = require("./middleware/authorize");

const tradeRoutes = require("./routes/trade");
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

app.use(Cors());
app.use(bodyParser.json());
app.use(express.json());

async function main() {
  await mongoose.connect(dbUrl);
}
main()
  .then(() => {
    console.log("connection to db");
  })
  .catch((err) => {
    console.log(err);
  });

app.get(
  "/allHolding",
  authenticate,
  authorize("view_portfolio"),
  async (req, res) => {
    try {
      let allHolding = await HoldingsModel.find({});
      res.json(allHolding);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }
);

app.get(
  "/allPosition",
  authenticate,
  authorize("view_portfolio"),
  async (req, res) => {
    try {
      let allPosition = await PositionsModel.find({});
      res.json(allPosition);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Auth routes
app.use("/api/auth", require("./routes/auth"));

// Trade routes
app.use("/api/trade", tradeRoutes);

app.get("/", (req, res) => res.send("Api running"));

app.listen(8080, () => {
  console.log("root is working");
});

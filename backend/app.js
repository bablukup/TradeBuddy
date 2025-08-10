const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
require("dotenv").config();
const bodyParser = require("body-parser");
const Cors = require("cors");
const dbUrl = process.env.ATLASDB_URL;

app.use(Cors());
app.use(bodyParser.json());

main()
  .then(() => {
    console.log("connection to db");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(dbUrl);
}

app.get("/allHolding", async (req, res) => {
  try {
    let allHolding = await HoldingsModel.find({});
    res.json(allHolding);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/allPosition", async (req, res) => {
  try {
    let allPosition = await PositionsModel.find({});
    res.json(allPosition);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/newOrder", async (req, res) => {
  try {
    let newOrder = new OrdersModel({
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });
    await newOrder.save();
    res.send("Order saved successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(8080, () => {
  console.log("root is working");
});

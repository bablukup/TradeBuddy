const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
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

app.listen(8080, () => {
  console.log("root is working");
});

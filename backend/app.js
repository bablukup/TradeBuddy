const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const dbUrl = process.env.ATLASDB_URL;

const authenticate = require("./middleware/authenticate");
const authorize = require("./middleware/authorize");

const tradeRoutes = require("./routes/trade");
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

async function main() {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Optional: exit app on DB connection failure
  }
}
main();

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

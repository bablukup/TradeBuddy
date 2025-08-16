const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const finnhub = require("./services/finnhub");

const dbUrl = process.env.ATLASDB_URL;

// Allowed frontend domains
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

app.use(express.json());

// MongoDB connect
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
    process.exit(1);
  }
}
main();

// Routes
app.use("/api/funds", require("./routes/funds"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/trade", require("./routes/trade"));

app.get("/", (req, res) => res.send("Api running"));

//funnhub
app.get("/quote/:symbol", async (req, res) => {
  try {
    const symbol = req.params.symbol;
    const data = await finnhub.fetchQuote(symbol);
    res.json({ success: true, symbol, data });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "API error", details: err.message });
  }
});

app.listen(8080, () => {
  console.log("root is working");
});

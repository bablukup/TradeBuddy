const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const dbUrl = process.env.ATLASDB_URL;

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

app.listen(8080, () => {
  console.log("root is working");
});

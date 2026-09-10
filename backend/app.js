const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require("./config/db");


connectDB();

app.use(express.json());


app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

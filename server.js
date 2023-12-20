// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

function connectToMongo() {
  const db_uri = process.env.DB_URI;
  mongoose
    .connect(db_uri)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

connectToMongo();

const authRoutes = require("./routes/authRoutes");
const newsRoutes = require("./routes/newsRoutes");
const chatgptRoutes = require("./routes/chatgptRoutes");

app.use("/api/auth", authRoutes);
app.use("/api", newsRoutes);
app.use("/api", chatgptRoutes);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const expenseRoutes = require("./routes/expenses");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = `${process.env.MONGO_URI}/${process.env.DB_NAME}`;

app.use(cors());
app.use(express.json());

app.use("/api/expenses", expenseRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));

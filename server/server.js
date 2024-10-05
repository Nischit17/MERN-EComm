const express = require("express");
const dbConnect = require("./src/config/dbConnect");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Create A Database Connection
dbConnect();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./app/config/db.js");
const globalErrorHandler = require("./app/middleware/globalErrorHandler.js");

dotenv.config();

connectDB();

const authRoutes = require("./app/routes/auth-routes.js");
const countryRoutes = require("./app/routes/countryRoutes.js");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/countries", countryRoutes);
app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running  on port ${PORT}`));

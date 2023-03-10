require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const app = express();
const connectDB = require("./DataBase/Connect");
const userRoute = require("./routes/user");

const Port = process.env.Port || 5000;

connectDB();
app.use(express.json());
app.use("/api/users", userRoute);
app.listen(Port, () => console.log(`server running on port ${Port}`));

const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const apiRoutes = require("./routes/api");

dotenv.config();
const app = express();
app.use(bodyParser.json());
connectDB();

app.use("/api", apiRoutes);
const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
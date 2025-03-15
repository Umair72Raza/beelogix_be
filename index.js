const dotenv = require("dotenv");
dotenv.config();

const path = require('path');

const express = require("express");
const app = express();
const mongoose = require("./db/connection");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes =  require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes")

let PORT = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", require("./routes/applicationRoutes"));
app.use("/api/files", require("./routes/fileRoutes"));


const server = app.listen(PORT, "localhost", () => {
    console.log(`Server is up and running at http://localhost:${PORT}`);
});
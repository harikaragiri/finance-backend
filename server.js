const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✔"))
.catch((err) => console.log("MongoDB Error:", err));

// ROUTES
const recordRoutes = require("./src/routes/recordRoutes");
const userRoutes = require("./src/routes/userRoutes"); 

app.use("/api/records", recordRoutes);
app.use("/api/users", userRoutes); 

// TEST ROUTE
app.get("/", (req, res) => {
    res.send("Backend Running ");
});



app.use((err, req, res, next) => {
    console.error("ERROR :", err);

    res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error"
    });
});

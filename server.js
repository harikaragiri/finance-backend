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
const userRoutes = require("./src/routes/userRoutes"); // ✅ ADD THIS

app.use("/api/records", recordRoutes);
app.use("/api/users", userRoutes); // ✅ ADD THIS

// TEST ROUTE
app.get("/", (req, res) => {
    res.send("Backend Running 🚀");
});

// ❌ REMOVE this duplicate cors (not needed)
// app.use(cors({
//     origin: "http://localhost:3000",
//     credentials: true
// }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
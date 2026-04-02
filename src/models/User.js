const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },

    //ROLE BASED ACCESS CONTROL
    role: {
        type: String,
        enum: ["viewer", "analyst", "admin"],
        default: "viewer"
    },

    //STATUS 
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);

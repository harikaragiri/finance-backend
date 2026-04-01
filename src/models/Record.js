const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: [true, "Amount is required"],
        // 10/10 MOVE: Validation to prevent negative financial entries
        min: [0.01, "Amount must be greater than zero"]
    },
    type: {
        type: String,
        required: [true, "Record type (income/expense) is required"],
        enum: {
            values: ["income", "expense"],
            message: "{VALUE} is not a valid record type"
        }
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        trim: true, // Removes accidental whitespace (e.g., " Food" -> "Food")
        maxlength: [50, "Category name is too long"]
    },
    date: {
        type: Date,
        default: Date.now,
        required: [true, "Date is required"]
    },
    note: {
        type: String,
        trim: true,
        maxlength: [200, "Note cannot exceed 200 characters"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Record must belong to a user"] // Essential for Data Isolation
    }
}, { 
    timestamps: true,
    // 10/10 MOVE: Ensure virtuals are included when converting to JSON
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexing for performance (Requirement #8: Additional Thoughtfulness)
// This makes searching by user and date much faster as the database grows
recordSchema.index({ user: 1, date: -1 });

module.exports = mongoose.model("Record", recordSchema);
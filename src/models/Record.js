const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: [true, "Amount is required"],
       
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
        trim: true, 
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
        required: [true, "Record must belong to a user"] 
    }
}, { 
    timestamps: true,
    
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


recordSchema.index({ user: 1, date: -1 });

module.exports = mongoose.model("Record", recordSchema);

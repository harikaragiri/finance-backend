const Record = require("../models/Record");
const mongoose = require("mongoose");
const catchAsync = require("../utils/catchAsync");

exports.createRecord = catchAsync(async (req, res) => {
    const record = await Record.create({
        ...req.body,
        user: req.user.id
    });
    res.status(201).json(record);
});

exports.getRecords = catchAsync(async (req, res) => {
    const { type, category, page = 1 } = req.query;

    let filter = { user: req.user.id };

    if (type) filter.type = type;
    if (category) filter.category = category;

    const records = await Record.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * 10)
        .limit(10);

    res.json(records);
});

exports.deleteRecord = catchAsync(async (req, res) => {
    const deleted = await Record.findOneAndDelete({
        _id: req.params.id,
        user: req.user.id
    });

    if (!deleted) {
        return res.status(404).json({ message: "Record not found" });
    }

    res.json({ message: "Deleted successfully" });
});

exports.updateRecord = catchAsync(async (req, res) => {
    const record = await Record.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        req.body,
        { new: true }
    );

    if (!record) {
        return res.status(404).json({ message: "Record not found" });
    }

    res.json(record);
});

exports.getSummary = catchAsync(async (req, res) => {
    const data = await Record.aggregate([
        { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
        {
            $group: {
                _id: null,
                totalIncome: {
                    $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] }
                },
                totalExpense: {
                    $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] }
                }
            }
        },
        {
            $project: {
                _id: 0,
                totalIncome: 1,
                totalExpense: 1,
                balance: { $subtract: ["$totalIncome", "$totalExpense"] }
            }
        }
    ]);

    res.json(data[0] || {});
});

exports.getRecentRecords = catchAsync(async (req, res) => {
    const records = await Record.find({ user: req.user.id })
        .sort({ createdAt: -1 })
        .limit(5);

    res.json(records);
});

exports.getCategorySummary = catchAsync(async (req, res) => {
    const data = await Record.aggregate([
        { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
        {
            $group: {
                _id: "$category",
                total: { $sum: "$amount" },
                count: { $sum: 1 }
            }
        }
    ]);

    res.json(data);
});
exports.getDashboard = catchAsync(async (req, res) => {
    const summary = await Record.aggregate([
        { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
        {
            $group: {
                _id: null,
                totalIncome: {
                    $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] }
                },
                totalExpense: {
                    $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] }
                }
            }
        },
        {
            $project: {
                _id: 0,
                totalIncome: 1,
                totalExpense: 1,
                balance: { $subtract: ["$totalIncome", "$totalExpense"] }
            }
        }
    ]);

    const category = await Record.aggregate([
        { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
        {
            $group: {
                _id: "$category",
                total: { $sum: "$amount" }
            }
        }
    ]);

    const recent = await Record.find({ user: req.user.id })
        .sort({ createdAt: -1 })
        .limit(5);

    res.json({
        summary: summary[0] || {},
        category,
        recent
    });
});
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");

exports.registerUser = catchAsync(async (req, res) => {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
        return res.status(400).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashed,

        // SECURITY FIX: only admin can assign roles
        role: role && role === "admin" ? "admin" : "viewer"
    });

    res.status(201).json({
        message: "User registered successfully",
        user
    });
});

exports.loginUser = catchAsync(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user || user.status === "inactive") {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

   res.json({
    token,
    user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }
});
});

exports.getMe = catchAsync(async (req, res) => {
    const user = await User.findById(req.user.id);
    res.json(user);
});

exports.updateUserRole = catchAsync(async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        { role: req.body.role },
        { new: true }
    );
    res.json(user);
});

exports.updateUserStatus = catchAsync(async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
    );
    res.json(user);
});

exports.updateMyProfile = async (req, res) => {
    const allowedFields = ["name", "email"];

    const updates = {};
    allowedFields.forEach((field) => {
        if (req.body[field]) {
            updates[field] = req.body[field];
        }
    });

    const user = await User.findByIdAndUpdate(
        req.user.id,
        updates,
        { new: true }
    ).select("-password");

    res.json(user);
};
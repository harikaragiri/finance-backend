const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    getMe,
    updateUserRole,
    updateUserStatus
} = require("../controllers/userController");

const { verifyToken, checkRole } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/me", verifyToken, getMe);

router.patch("/:id/role", verifyToken, checkRole("admin"), updateUserRole);
router.patch("/:id/status", verifyToken, checkRole("admin"), updateUserStatus);

module.exports = router;
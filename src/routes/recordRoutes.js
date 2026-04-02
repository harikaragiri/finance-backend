const express = require("express");
const router = express.Router();

const {
    createRecord,
    getRecords,
    updateRecord,
    deleteRecord,
    getSummary,
    getRecentRecords,
    getCategorySummary,
    getDashboard
} = require("../controllers/recordController");

const { verifyToken, checkRole } = require("../middleware/authMiddleware");
const { body, validationResult } = require("express-validator");

// GET
router.get("/", verifyToken, getRecords);
router.get("/recent", verifyToken, getRecentRecords);
router.get("/summary", verifyToken, checkRole("analyst", "admin"), getSummary);
router.get("/category-summary", verifyToken, checkRole("analyst", "admin"), getCategorySummary);
router.get("/dashboard", verifyToken, getDashboard);


router.post(
    "/",
    verifyToken,
    checkRole("admin"),
    [
        body("amount").isNumeric(),
        body("type").isIn(["income", "expense"]),
        body("category").notEmpty()
    ],
    (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation Error",
            errors: errors.array()
        });
    }

    next();
},
    createRecord
);


router.put("/:id", verifyToken, checkRole("admin"), updateRecord);
router.delete("/:id", verifyToken, checkRole("admin"), deleteRecord);

module.exports = router;
const express = require("express");
const router = express.Router();

const {
    createRecord,
    getRecords,
    deleteRecord,
    updateRecord,
    getSummary,
    getRecentRecords,
    getCategorySummary
} = require("../controllers/recordController");

const { verifyToken, checkRole } = require("../middleware/authMiddleware");

router.get("/", verifyToken, getRecords);
router.get("/recent", verifyToken, getRecentRecords);
router.get("/summary", verifyToken, checkRole("analyst", "admin"), getSummary);
router.get("/category-summary", verifyToken, checkRole("analyst", "admin"), getCategorySummary);

router.post("/", verifyToken, checkRole("admin"), createRecord);
router.put("/:id", verifyToken, checkRole("admin"), updateRecord);
router.delete("/:id", verifyToken, checkRole("admin"), deleteRecord);

module.exports = router;
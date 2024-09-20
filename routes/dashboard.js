const express = require("express");
const router = express.Router();
const { isAuthenticated, isAdmin } = require("../middlewares/authMiddleware");
const dashboardController = require("../controllers/dashboardController");

router.get("/dashboard", isAuthenticated, dashboardController.dashboard);
router.get("/dashboard/admin", isAuthenticated, isAdmin, dashboardController.adminPanel);

module.exports = router;

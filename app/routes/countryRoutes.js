const express = require("express");
const router = express.Router();
const {
  getCountries,
  getCountryDetail,
} = require("../controllers/countryController.js");
const { protect } = require("../middleware/authMiddleware.js");

router.get("/", protect, getCountries);
router.get("/:code", protect, getCountryDetail);

module.exports = router;

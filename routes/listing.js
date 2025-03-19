const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const {
  isLoggedIn,
  isOwner,
  validateListing,
  isReviewAuthor,
} = require("../middleware.js");
const listingController = require("../controllers/listings");
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });

//index route
router.get("/", wrapAsync(listingController.index));

//new route
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));

//show route
router.get("/:id", isLoggedIn, wrapAsync(listingController.showListing));

//create route
router.post(
  "/",
  isLoggedIn,
  upload.single("listing[image][url]"),
  validateListing,
  wrapAsync(listingController.createListing)
);

//edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

//update route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single("listing[image][url]"),
  validateListing,
  wrapAsync(listingController.updateListing)
);

//delete route
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.deleteListing)
);

module.exports = router;

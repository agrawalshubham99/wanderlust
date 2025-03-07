const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const Review = require("../models/review");
const Listing = require("../models/listing");

//Reviews
//Post route for reviews
router.post(
  "/",
  validateReview,
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "Successfully added a new review");
    res.redirect(`/listings/${listing._id}`);
  })
);

//Delete route for reviews
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Successfully deleted a review");
  res.redirect(`/listings/${id}`);
});

module.exports = router;

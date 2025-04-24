const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {  reviewSchema } = require("../schema.js");
const {isLoggedIn, isReviewAuthor, validateReview} = require("../middleware.js")
const reviewControler = require("../controllers/reviews.js")


//Reviews
router.post(
    "/",
    isLoggedIn,
    validateReview,
    isReviewAuthor,
    wrapAsync(reviewControler.createReview)
  );
  
  //Delete Reviews Route
  router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewControler.deleteReview)
  );

  module.exports = router;
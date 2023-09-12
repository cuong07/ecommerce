const express = require("express");
const auth = require("../middleware/auth");
const ReviewControllers = require("../controllers/ReviewController");

const routes = express.Router();

routes.post("/review", auth.verifyToken, ReviewControllers.createRveview);
routes.get(
  "/review/mine",
  auth.verifyToken,
  ReviewControllers.getReviewByUser
);
routes.get(
  "/review",
  auth.verifyToken,
  ReviewControllers.getReviewAboutProduct
);

module.exports = routes;

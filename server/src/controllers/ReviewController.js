const Review = require("../models/Review");
const Rating = require("../models/Rating");
const Product = require("../models/Product");
const User = require("../models/User");

exports.createRveview = async (req, res) => {
  const { user } = req;
  const { productId, rating = 0, content } = req.body;

  try {
    const exitingReview = await Review.findOne({
      where: {
        UserId: user.id,
        ProductId: productId,
      },
    });

    if (exitingReview) {
      return res
        .status(500)
        .json({ message: "you have reached the limit of product" });
    }
    const newReview = await Review.create({
      content,
      ProductId: productId,
      UserId: user.id,
    });
    const product = await Product.findByPk(productId);
    if (!product) res.status(500).json({ message: "Product not found" });
    const [productRating, created] = await Rating.findOrCreate({
      where: { ProductId: productId },
      defaults: {
        rating: rating,
        ProductId: productId,
        total_review: 1,
      },
    });

    const newRating =
      (productRating.dataValues.rating + rating) /
      (productRating.dataValues.total_review + 1);

    if (!created) {
      await Rating.update(
        {
          rating: newRating,
          total_review: productRating.dataValues.total_review + 1,
        },
        {
          where: { id: productRating.id },
        }
      );
    }
    res.status(200).json({
      message: "create review successfully",
      success: true,
      data: { ...newReview.dataValues },
    });
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({
      message: "create review failed",
      err: error,
    });
  }
};

exports.getReviewAboutProduct = async (req, res) => {
  const { id, page, size } = req.query;
  const currentPage = parseInt(page) || 1;
  const pageSize = parseInt(size) || 10;
  try {
    const offset = (currentPage - 1) * pageSize;
    const { count, rows } = await Review.findAndCountAll({
      where: {
        ProductId: id,
      },
      include: [
        {
          model: Product,
          required: true,
          attributes: ["name", "description", "price", "image", "createdAt"],
        },
        {
          model: User,
          required: true,
          attributes: ["first_name", "last_name", "image", "createdAt"],
        },
      ],
      limit: pageSize,
      offset: offset,
      attributes: ["id", "content", "createdAt"],
    });
    const totalCount = count;
    const totalPages = Math.ceil(totalCount / pageSize);
    res.status(200).json({
      message: "Review about product",
      success: true,
      totalCount,
      data: { ...rows },
      totalPages,
      currentPage,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

exports.getReviewByUser = async (req, res) => {
  const {user} = req;
  const { page, size } = req.query;
  const currentPage = parseInt(page) || 1;
  const pageSize = parseInt(size) || 10;
  try {
    const offset = (currentPage - 1) * pageSize;
    const { count, rows } = await Review.findAndCountAll({
      where: {
        UserId: user.id,
      },
      include: [
        {
          model: Product,
          required: true,
          attributes: ["name", "description", "price", "image", "createdAt"],
        },
        {
          model: User,
          required: true,
          attributes: ["first_name", "last_name", "image", "createdAt"],
        },
      ],
      limit: pageSize,
      offset: offset,
      attributes: ["id", "content", "createdAt"],
    })

    const totalCount = count;
    const totalPages = Math.ceil(totalCount / pageSize);
    res.status(200).json({
      message: "Review by user",
      success: true,
      totalCount,
      data: { ...rows },
      totalPages,
      currentPage,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
}


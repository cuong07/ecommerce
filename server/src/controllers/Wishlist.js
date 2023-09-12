const Wishlist = require("../models/Wishlist");

exports.addWishlist = async (req, res) => {
  const { user } = req;
  const { productId, wishlistId } = req.body;
  const listProductId = [];
  try {
    const wishlist = await Wishlist.findByPk(wishlistId);
    if (!wishlist) {
      return res.status(400).json({
        message: "Wishlist not found",
      });
    }
    let prevWishlistProduct = JSON.parse(wishlist.dataValues.list);
    const newWishlist = prevWishlistProduct.push(productId);

    const data = await Wishlist.update(
      {
        list: newWishlist,
      },
      {
        where: {
          id: wishlistId,
        },
      }
    );
    res.status(200).json({
      message: "Wishlist updated",
      data,
    });
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({
      message: "Error updating wishlist",
      err: error,
    });
  }
};

exports.createWishlist = async (req, res) => {
  
}
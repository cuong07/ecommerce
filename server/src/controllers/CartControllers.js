const CartItem = require("../models/CartItem");
const Product = require("../models/Product");
const ProductCategory = require("../models/ProductCategory");
const ProductInventory = require("../models/ProductInventory");
const ShoppingSession = require("../models/ShoppingSession");
const User = require("../models/User");

exports.createCartItem = async (req, res) => {
  const { productId, quantity } = req.body;
  const { user } = req;
  try {
    const [session, created] = await ShoppingSession.findOrCreate({
      where: { UserId: user.id },
      defaults: {
        UserId: user.id,
        total: 0,
      },
    });
    const product = await Product.findByPk(productId);
    const totalAmount =
      parseFloat(session.dataValues.total) +
      parseInt(quantity) * parseFloat(product.price);
    if (!created) {
      const existingItem = await CartItem.findOne({
        where: {
          ProductId: productId,
          ShoppingSessionId: session.dataValues.id,
        },
      });
      if (existingItem) {
        if (parseInt(existingItem.quantity, 0) + parseInt(quantity, 0) <= 0) {
          await CartItem.destroy({
            where: {
              id: existingItem.id,
            },
          });
        }
        if (existingItem.quantity >= quantity) {
          await CartItem.update(
            {
              quantity:
                parseInt(existingItem.quantity, 0) + parseInt(quantity, 0),
            },
            {
              where: {
                id: existingItem.id,
              },
            }
          );
          await ShoppingSession.update(
            {
              total: totalAmount,
            },
            {
              where: {
                id: session.dataValues.id,
              },
            }
          );
        }
      } else {
        await CartItem.create({
          ProductId: productId,
          quantity: quantity,
          ShoppingSessionId: session.dataValues.id,
        });

        await ShoppingSession.update(
          {
            total: totalAmount,
          },
          {
            where: {
              id: session.dataValues.id,
            },
          }
        );
      }
      return res.json(session.dataValues);
    }
    await ShoppingSession.update(
      {
        total: totalAmount,
      },
      {
        where: {
          id: session.dataValues.id,
        },
      }
    );
    const data = await CartItem.create({
      ProductId: productId,
      quantity: quantity,
      ShoppingSessionId: session.dataValues.id,
    });

    return res.status(200).json({
      message: "updated successfully",
      success: true,
      data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
      err: error,
    });
  }
};

exports.deleteCartItem = async (req, res) => {
  const { id } = req.query;
  try {
    const cartItem = await CartItem.destroy({ where: { id } });
    res.status(200).json({
      message: "delete cart item successfully",
      success: true,
      cartItem,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
      err: error,
    });
  }
};

exports.getShoppingSession = async (req, res) => {
  const { user } = req;
  const { page, size } = req.params;
  const currentPage = parseInt(page) || 1;
  const pageSize = parseInt(size) || 10;
  try {
    const offset = (currentPage - 1) * pageSize;
    const session = await ShoppingSession.findOne({
      where: { UserId: user.id },
    });
    if (!session) {
      return res.status(404).json({ message: "Shopping session not found" });
    }
    const { count, rows } = await CartItem.findAndCountAll({
      where: {
        ShoppingSessionId: session.dataValues.id,
      },
      include: [
        {
          model: ShoppingSession,
          required: true,
        },
        {
          model: Product,
          required: true,
        },
      ],
      attributes: { exclude: ["ShoppingSessionId", "ProductId"] },
      limit: pageSize,
      offset: offset,
    });

    res.status(200).json({
      message: "Get cart item successfully",
      data: { ...rows },
      totalCount: count,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
      err: error,
    });
  }
};

exports.getAllShoppingSessions = async (req, res) => {
  const { page, size } = req.params;
  const currentPage = parseInt(page) || 1;
  const pageSize = parseInt(size) || 10;
  try {
    const offset = (currentPage - 1) * pageSize;
    const { count, rows } = await ShoppingSession.findAndCountAll({
      include: [
        {
          model: User,
          required: true,
          attributes: [
            "id",
            "admin",
            "first_name",
            "last_name",
            "email",
            "telephone",
            "image",
            "createdAt",
            "updatedAt",
          ],
        },
        {
          model: CartItem,
          required: true,
          include: [
            {
              model: Product,
              include: [
                {
                  model: ProductInventory,
                },
                {
                  model: ProductCategory,
                },
              ],
            },
          ],
        },
      ],
      limit: pageSize,
      offset: offset,
    });

    const totalPages = Math.ceil(count / pageSize);
    res.status(200).json({
      message: "Get cart item successfully",
      data: [...rows],
      totalCount: count,
      success: true,
      totalPages,
      currentPage,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
      err: error,
    });
  }
};

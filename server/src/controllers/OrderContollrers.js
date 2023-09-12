const OrderDetail = require("../models/OrderDetails");
const OrderItem = require("../models/OrderItems");
const CartItem = require("../models/CartItem");
const ShoppingSession = require("../models/ShoppingSession");
const UserPayment = require("../models/UserPayment");
const PaymentDetail = require("../models/PaymentDetail");
const UserAddress = require("../models/UserAddress");
const sequelize = require("../../util/database"); // Import sequelize instance

exports.createOrder = async (req, res) => {
  const { user } = req;
  const {
    sessionId,
    addressLine1,
    addressLine2,
    city,
    country,
    telephone,
    amount,
    provider,
    status = false,
    total = 0,
  } = req.body;
  try {
    const session = await ShoppingSession.findByPk(sessionId);

    if (!session) {
      res.status(500).json({ message: "Session not found" });
    }

    const paymentDetail = await PaymentDetail.create({
      amount,
      provider,
      status,
    });

    const listCartitems = await CartItem.findAll({
      where: { ShoppingSessionId: session.dataValues.id },
    });

    const orderDetail= await OrderDetail.create({
      UserId: user.id,
      PaymentDetailId: paymentDetail.dataValues.id,
      total,
    });

    const userAddress = await UserAddress.findOne({
      where: {
        UserId: user.id,
      },
    });

    if (!userAddress) {
      await UserAddress.create({
        address_line1: addressLine1,
        address_line2: addressLine2,
        city,
        country,
        telephone,
        UserId: user.id,
      });
    }

    for (const cartItem of listCartitems) {
      const orderItemData = {
        quantity: cartItem.dataValues.quantity,
        ProductId: cartItem.dataValues.ProductId,
        OrderDetailId: orderDetail.id,
      };
      await OrderItem.create(orderItemData);
      await cartItem.destroy();
    }
    await session.destroy();
    res.status(200).json({ message: "Order created successfully." });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    console.error("Lỗi tại dòng 37:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

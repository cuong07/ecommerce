const OrderDetails = require("../models/OrderDetails");
const OrderItems = require("../models/OrderItems");
const Product = require("../models/Product");
const ProductCategory = require("../models/ProductCategory");
const Category = require("../models/ProductCategory");
const { Op } = require("sequelize");
const ProductInventory = require("../models/ProductInventory");
const Discount = require("../models/Discount");
const User = require("../models/User");
const PaymentDetail = require("../models/PaymentDetail");
const sequelize = require("sequelize");

exports.getOrderDetailsForChart = async (req, res) => {
  try {
    const today = new Date(); // Lấy ngày và giờ hiện tại
    const thirtyDaysAgo = new Date(today); // Tạo một bản sao của today
    thirtyDaysAgo.setDate(today.getDate() - 30); // Trừ đi 30 ngày từ today

    const dataForChart = {
      labels: [],
      data: [],
      label: "Total Revenue",
    };

    for (let i = 0; i <= 30; i++) {
      const startOfDay = new Date(thirtyDaysAgo);
      startOfDay.setDate(thirtyDaysAgo.getDate() + i);
      const endOfDay = new Date(thirtyDaysAgo);
      endOfDay.setDate(thirtyDaysAgo.getDate() + i + 1);

      const total = await OrderDetails.sum("total", {
        where: {
          createdAt: {
            [Op.between]: [startOfDay, endOfDay],
          },
        },
      });

      const formattedDate = startOfDay.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "numeric",
      });
      dataForChart.labels.push(formattedDate);
      dataForChart.data.push(total ? total : 0);
    }

    res.status(200).json({
      message: "Get order details for chart successfully",
      success: true,
      data: dataForChart,
    });
  } catch (error) {
    console.error("Lỗi khi truy vấn dữ liệu:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.getMostSoldProduct = async (req, res) => {
  const { page, size } = req.query;
  const currentPage = parseInt(page) || 1;
  const pageSize = parseInt(size) || 10;
  try {
    const offset = (currentPage - 1) * pageSize;
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const products = await OrderItems.findAll({
      include: [
        {
          model: Product,
          required: true,
          attributes: [
            "id",
            "name",
            "price",
            "description",
            "image",
            "createdAt",
            "updatedAt",
            "SKU",
          ],
          include: [ProductCategory, ProductInventory, Discount],
        },
      ],
      limit: pageSize,
      offset: offset,
      attributes: ["id", "quantity"],
      where: {
        createdAt: {
          [Op.between]: [thirtyDaysAgo, today],
        },
      },
      order: [["quantity", "asc"]],
    });
    const productQuantities = {};
    for (const product of products) {
      const productId = product.Product.id;
      const quantity = product.quantity;
      if (!productQuantities[productId]) {
        productQuantities[productId] = {
          id: product.Product.id,
          quantity: quantity,
          Product: product.Product.toJSON(),
        };
      } else {
        productQuantities[productId].quantity += quantity;
      }
    }
    const result = Object.values(productQuantities).sort(
      (a, b) => b.quantity - a.quantity
    );
    res.status(200).json({
      message: "Get successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Lỗi khi truy vấn dữ liệu:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.getCountProductByCategoryForChart = async (req, res) => {
  try {
    const categories = await Category.findAll();
    const categoryPromises = categories.map(async (category) => {
      return await category.countProducts();
    });
    const dataForChart = {
      labels: [],
      data: [],
      label: "Product count for category",
    };
    const productCounts = await Promise.all(categoryPromises);
    for (let i = 0; i < categories.length; i++) {
      dataForChart.labels.push(categories[i].name);
      dataForChart.data.push(productCounts[i]);
    }
    return res.status(200).json({
      data: dataForChart,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getBiggestBuyers = async (req, res) => {
  const { page, size } = req.query;
  const currentPage = parseInt(page) || 1;
  const pageSize = parseInt(size) || 10;
  try {
    const offset = (currentPage - 1) * pageSize;
    const userPurchaseData = await OrderDetails.findAll({
      attributes: [
        "UserId",
        [sequelize.fn("sum", sequelize.col("total")), "total"],
      ],
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
            "image",
          ],
        },
      ],
      group: ["UserId", "User.id"],
      order: [[sequelize.literal("total"), "DESC"]],
      limit: pageSize,
      offset: offset,
    });
    return res.status(200).json({
      data: userPurchaseData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
};

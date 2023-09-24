const fs = require("fs");
const Product = require("../models/Product");
const cloudinary = require("../../cloudinary");
const { Op } = require("sequelize");
const ProductInventory = require("../models/ProductInventory");
const ProductCategory = require("../models/ProductCategory");
const Discount = require("../models/Discount");
const { log } = require("console");

exports.createProduct = async (req, res) => {
  const { name, description, price, catogoryId, inventory, discountId } =
    req.body;
  const uploader = async (path) =>
    await cloudinary.uploads(path, "node-mystore");
  const urls = [];
  if (req.method === "POST") {
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
  } else {
    res.status(405).json({
      err: "error",
    });
  }
  const newArray = urls.map((item) => item.id);
  try {
    const newInventory = await ProductInventory.create({
      quantity: inventory,
    });

    const data = await Product.create({
      name,
      description,
      price,
      image: JSON.stringify(newArray),
      ProductCategoryId: catogoryId,
      ProductInventoryId: newInventory.id,
      DiscountId: discountId,
    });

    res.status(200).json({
      message: "Created successfully",
      data,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "Có lỗi xảy ra khi thêm sản phẩm",
    });
  }
};

exports.updateProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    categoryId,
    inventoryId,
    discountId,
    productId,
  } = req.body;
  const uploader = async (path) =>
    await cloudinary.uploads(path, "node-mystore");
  const urls = [];
  if (req.method === "PUT") {
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
  } else {
    res.status(405).json({
      err: "error",
    });
  }
  const newArray = urls.map((item) => item.id);

  try {
    const product = await Product.findByPk(productId);
    let arrayImage = JSON.parse(product.image);
    arrayImage = arrayImage.concat(newArray);
    const productData = { ...product.dataValues };
    productData.image = JSON.stringify(arrayImage);

    const data = await Product.update(
      {
        name: name,
        description: description,
        price: price,
        image: productData.image,
        ProductCategoryId: categoryId,
        ProductInventoryId: inventoryId,
        DiscountId: discountId,
      },
      {
        where: {
          id: productId,
        },
      }
    );

    if (data[0] === 1) {
      res.status(200).json({
        message: "Updated successfully",
        data,
        success: true,
      });
    } else {
      res.status(400).json({
        message: "Update failed",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Có lỗi xảy ra khi cập nhật sản phẩm",
    });
  }
};

exports.findProductByName = async (req, res) => {
  const { name, page, size } = req.query;
  const currentPage = parseInt(page) || 1;
  const pageSize = parseInt(size) || 10;
  try {
    const offset = (currentPage - 1) * pageSize;
    const results = await Product.findAndCountAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
      include: [
        {
          model: ProductCategory,
          require: true,
          attributes: ["name", "id", "description"],
        },
        {
          model: ProductInventory,
          require: true,
          attributes: ["id", "quantity"],
        },
        {
          model: Discount,
          require: true,
          attributes: [
            "id",
            "discount_percent",
            "name",
            "description",
            "active",
            "createdAt",
          ],
        },
      ],
      attributes: [
        "id",
        "name",
        "description",
        "price",
        "createdAt",
        "updatedAt",
        "image",
        "SKU",
      ],
      limit: pageSize,
      offset: offset,
    });

    const totalCount = results.count;
    const data = results.rows;
    const totalPages = Math.ceil(totalCount / pageSize);
    res.status(200).json({
      data,
      totalCount,
      totalPages,
      currentPage,
    });
  } catch (err) {
    throw new Error(err);
  }
};

exports.findProductById = async (req, res) => {
  const { id } = req.params;
  const { page, size } = req.query;
  const currentPage = parseInt(page) || 1;
  const pageSize = parseInt(size) || 10;
  try {
    const offset = (currentPage - 1) * pageSize;
    const data = await Product.findByPk(id, {
      include: [
        {
          model: ProductCategory,
          require: true,
          attributes: ["name", "id", "description"],
        },
        {
          model: ProductInventory,
          require: true,
          attributes: ["id", "quantity"],
        },
        {
          model: Discount,
          require: true,
          attributes: [
            "id",
            "discount_percent",
            "name",
            "description",
            "active",
            "createdAt",
          ],
        },
      ],
      attributes: [
        "id",
        "name",
        "description",
        "price",
        "createdAt",
        "updatedAt",
        "image",
        "SKU",
      ],
      limit: pageSize,
      offset: offset,
    });
    res.status(200).json({
      message: "get product successfully",
      data,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Có lỗi xảy ra khi tìm kiếm sản phẩm",
    });
  }
};

exports.updateImageProduct = async (req, res) => {
  const { productId, imageId } = req.body;
  console.log(productId, imageId);

  try {
    const product = await Product.findByPk(productId);
    let arrayImage = JSON.parse(product.image);
    arrayImage = arrayImage.filter((item) => item !== imageId);
    const productData = { ...product.dataValues };
    productData.image = JSON.stringify(arrayImage);

    const data = await Product.update(
      {
        image: productData.image,
        ...productData,
      },
      {
        where: {
          id: productId,
        },
      }
    );

    if (data[0] === 1) {
      res.status(200).json({
        message: "Updated successfully",
        data,
        success: true,
      });
    } else {
      res.status(400).json({
        message: "Update failed",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Có lỗi xảy ra khi cập nhật sản phẩm",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    await ProductInventory.destroy({
      where: {
        id: product.ProductInventoryId,
      },
    });
    const data = await Product.destroy({ where: { id } });

    res.status(200).json({
      message: "Delete successfully",
      data,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Có lỗi xảy ra khi xoa sản phẩm",
    });
  }
};

exports.findProductByCategory = async (req, res) => {
  const { categoryId, page, size } = req.query;
  const currentPage = parseInt(page) || 1;
  const pageSize = parseInt(size) || 10;
  try {
    const offset = (currentPage - 1) * pageSize;
    const { count, rows } = await Product.findAndCountAll({
      where: {
        ProductCategoryId: categoryId,
      },
      include: [
        {
          model: ProductCategory,
          require: true,
          attributes: ["name", "id", "description"],
        },
        {
          model: ProductInventory,
          require: true,
          attributes: ["id", "quantity"],
        },
        {
          model: Discount,
          require: true,
          attributes: [
            "id",
            "discount_percent",
            "name",
            "description",
            "active",
            "createdAt",
          ],
        },
      ],
      attributes: [
        "id",
        "name",
        "description",
        "price",
        "createdAt",
        "updatedAt",
        "image",
        "SKU",
      ],
      limit: pageSize,
      offset: offset,
    });
    const totalCount = count;
    const totalPages = Math.ceil(totalCount / pageSize);
    res.status(200).json({
      message: "Search successfully",
      success: true,
      totalCount,
      data: {
        ...rows,
      },
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

exports.getProduct = async (req, res) => {
  const { page, size } = req.query;
  const currentPage = parseInt(page) || 1;
  const pageSize = parseInt(size) || 10;
  try {
    const offset = (currentPage - 1) * pageSize;
    const { count, rows } = await Product.findAndCountAll({
      include: [
        {
          model: ProductCategory,
          require: true,
          attributes: ["name", "id", "description"],
        },
        {
          model: ProductInventory,
          require: true,
          attributes: ["id", "quantity"],
        },
        {
          model: Discount,
          require: true,
          attributes: [
            "id",
            "discount_percent",
            "name",
            "description",
            "active",
            "createdAt",
          ],
        },
      ],
      attributes: [
        "id",
        "name",
        "description",
        "price",
        "createdAt",
        "updatedAt",
        "image",
        "SKU",
      ],
      limit: pageSize,
      offset: offset,
    });
    const totalPages = Math.ceil(count / pageSize);
    res.status(200).json({
      message: "get product successfully",
      data: [...rows],
      totalCount: count,
      totalPages,
      currentPage,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "get product failed",
    });
  }
};

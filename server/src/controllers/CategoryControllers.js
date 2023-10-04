const { where } = require("sequelize");
const Category = require("../models/ProductCategory");
const Product = require("../models/Product");

exports.createCategory = async (req, res) => {
  const { name, description } = req.body;
  console.log(name);
  try {
    const data = await Category.create({
      name,
      description,
    });
    res.status(200).json({
      messager: "create successfully",
      data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      messager: "Internal server error",
    });
  }
};

exports.updateCategory = async (req, res) => {
  const { id, name, description } = req.body;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      res.status(404).json({ messager: "Category not found!" });
    }
    const updatedRowCount = await Category.update(
      {
        name,
        description,
      },
      {
        where: {
          id,
        },
        returning: true,
      }
    );
    if (updatedRowCount[1] === 1) {
      res.status(200).json({
        message: "Cập nhật thành công",
        success: true,
      });
    } else {
      res.status(404).json({
        message: "Không tìm thấy hoặc có lỗi khi cập nhật",
        success: false,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
      err: error,
    });
  }
};

exports.getCategoryById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const category = await Category.findByPk(id);
    if (!category)
      return res.status(500).json({ message: "Category not found" });
    res.status(200).json({
      message: "get categories successfully",
      success: true,
      data: category,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message, err: error });
  }
};

exports.getCategoryWithProductCount = async (req, res) => {
  const { page, size } = req.query;
  const currentPage = parseInt(page) || 1;
  const pageSize = parseInt(size) || 10;

  try {
    const offset = (currentPage - 1) * pageSize;
    const categories = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: [],
        },
      ],
      attributes: ["id", "name", "description", "createdAt", "updatedAt"],
      limit: pageSize,
      offset: offset,
    });
    const result = await Promise.all(
      categories.map(async (category) => {
        const productCount = await category.countProducts();
        return {
          id: category.id,
          name: category.name,
          productCount: productCount,
          description: category.description,
          createdAt: category.createdAt,
          updatedAt: category.updatedAt,
        };
      })
    );

    res.status(200).json({
      message: "get categories with product count",
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message, err: error });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.query;
  try {
    await Category.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({
      messager: "delete category successfully",
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

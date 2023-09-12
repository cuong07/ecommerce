const { where } = require("sequelize");
const Category = require("../models/ProductCategory");

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
  console.log(id);
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

exports.getCategory = async (req, res) => {
  try {
    const { count, rows } = await Category.findAndCountAll();
    res.status(200).json({
      message: "get category",
      success: true,
      data: { ...rows },
      totalCount: count,
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

const Discount = require("../models/Discount");

exports.createDiscount = async (req, res) => {
  const { name, description, percent } = req.body;
  try {
    const data = await Discount.create({
      name,
      description,
      discount_percent: percent,
      active: true,
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

exports.updateDiscount = async (req, res) => {
  const { id, name, description, percent, active } = req.body;
  console.log(id, name, description, percent);
  try {
    const discount = await Discount.findByPk(id);
    if (!discount) {
      res.status(404).json({ messager: "Discount not found!" });
    }
    console.log(discount.dataValues);
    const updatedRowCount = await Discount.update(
      {
        name,
        description,
        discount_percent: percent,
        active,
      },
      {
        where: {
          id,
        },
      }
    );
    console.log(updatedRowCount);
    if (updatedRowCount[0] === 1) {
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

exports.getDiscount = async (req, res) => {
  try {
    const { count, rows } = await Discount.findAndCountAll();
    res.status(200).json({
      message: "get Discount",
      success: true,
      data: { ...rows },
      totalCount: count,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message, err: error });
  }
};

exports.deleteDiscount = async (req, res) => {
  const { id } = req.query;
  try {
    await Discount.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({
      messager: "delete discount successfully",
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

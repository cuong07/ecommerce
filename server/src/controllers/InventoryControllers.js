const Inventory = require("../models/ProductInventory");

exports.createInventory = async (req, res) => {
  const { quantity } = req.body;
  try {
    const result = await Inventory.create({
      quantity,
    });
    res.status(200).json({
      messager: "create successfully",
      result,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      messager: "Internal server error",
    });
  }
};

exports.updateInventory = async (req, res) => {
  const { id, count } = req.body;
  try {
    const result = await Inventory.findByPk(id);
    if (!result) res.status(404).json({ message: "Not Found" });
    let newQuantity = result.dataValues.quantity - count;
    if (newQuantity <= 0) {
      if (newQuantity === 0) {
        await Inventory.destroy({
          where: {
            id,
          },
        });
      } else {
        return res.status(500).json({
          message: "The remaining quantity is not enough!",
          success: false,
        });
      }
    }
    await Inventory.update(
      {
        quantity: newQuantity,
      },
      {
        where: {
          id,
        },
      }
    );

    res.status(200).json({
      message: "Updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Error updating inventory",
      err: error,
    });
  }
};

exports.getInventory = async (req, res) => {
  try {
    const { count, rows } = await Inventory.findAndCountAll();
    res.status(200).json({
      message: "get inventory successfully",
      success: true,
      data: { ...rows },
      totalCount: count,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message, err: error });
  }
};

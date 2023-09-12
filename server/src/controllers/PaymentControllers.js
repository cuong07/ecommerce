const UserPayment = require("../models/UserPayment");
const PaymentDetail = require("../models/PaymentDetail");

exports.createUserPayment = async (req, res) => {
  const { user } = req;
  const { paymentType, provider, accountNo, expiry } = req.body;
  try {
    const existingPayment = await UserPayment.findOne({
      where: {
        UserId: user.id,
        payment_type: paymentType,
      },
    });
    if (existingPayment) {
      await UserPayment.update(
        {
          payment_type: paymentType,
          provider,
          account_no: accountNo,
          expiry,
        },
        {
          where: {
            id: existingPayment.dataValues.id,
          },
        }
      );
      return res.status(200).json({
        message: "Payment update successfully",
        success: true,
      });
    }

    const userPayment = await UserPayment.create({
      payment_type: paymentType,
      provider,
      account_no: accountNo,
      expiry,
      UserId: user.id,
    });

    res.status(200).json({
      message: "Payment created successfully",
      success: true,
      data: { ...userPayment.dataValues },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
      err: error,
    });
  }
};

exports.deletePayment = async (req, res) => {
  const { paymentId } = req.params;
  try {
    const payment = await UserPayment.destroy({
      where: {
        id: paymentId,
      },
    });
    res.status(200).json({
      message: "Payment deleted successfully",
      success: true,
      data: { ...payment },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
      err: error,
    });
  }
};

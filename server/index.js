const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
/* DATABASE */
const sequelize = require("./util/database");
const CartItem = require("./src/models/CartItem");
const Discount = require("./src/models/Discount");
const OrderDetails = require("./src/models/OrderDetails");
const OrderItems = require("./src/models/OrderItems");
const PaymentDetail = require("./src/models/PaymentDetail");
const Product = require("./src/models/Product");
const ProductCategory = require("./src/models/ProductCategory");
const ProductInventory = require("./src/models/ProductInventory");
const ShoppingSession = require("./src/models/ShoppingSession");
const User = require("./src/models/User");
const UserAddress = require("./src/models/UserAddress");
const UserPayment = require("./src/models/UserPayment");
const Wishlist = require("./src/models/Wishlist");
const Itemlist = require("./src/models/Itemlist");
const Review = require("./src/models/Review");
const Rating = require("./src/models/Rating");

/* ROUTER */
const authRoutes = require("./src/routes/auth");
const productRoutes = require("./src/routes/Product");
const categoryRoutes = require("./src/routes/Category");
const discountRoutes = require("./src/routes/Discount");
const inventoryRoutes = require("./src/routes/Inventory");
const cartRoutes = require("./src/routes/Cart");
const orderRoutes = require("./src/routes/Order");
const paymentRoutes = require("./src/routes/Payment");
const reviewRoutes = require("./src/routes/Review");
const datasetRoutes = require("./src/routes/Dataset");
// DATABASE

Product.belongsTo(ProductCategory);
ProductCategory.hasMany(Product);
Product.belongsTo(ProductInventory);
Product.belongsTo(Discount);
User.hasMany(OrderDetails);
OrderDetails.belongsTo(User);
OrderDetails.belongsTo(PaymentDetail);
OrderItems.belongsTo(OrderDetails);
OrderDetails.hasMany(OrderItems);
OrderItems.belongsTo(Product);
Product.hasMany(OrderItems);
ShoppingSession.hasMany(CartItem);
CartItem.belongsTo(ShoppingSession);
Product.hasMany(CartItem);
CartItem.belongsTo(Product);
ShoppingSession.belongsTo(User);
User.hasMany(ShoppingSession);
UserAddress.belongsTo(User);
User.hasOne(UserAddress);
UserPayment.belongsTo(User);
User.hasOne(UserPayment);
Wishlist.belongsTo(User);
Review.belongsTo(Product);
Product.hasMany(Review);
Review.belongsTo(User);
User.hasMany(Review);
Rating.belongsTo(Product);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ origin: true, credentials: true }));

// ROUTES
app.use("/apiv1", authRoutes);
app.use("/apiv1", productRoutes);
app.use("/apiv1", categoryRoutes);
app.use("/apiv1", discountRoutes);
app.use("/apiv1", inventoryRoutes);
app.use("/apiv1", cartRoutes);
app.use("/apiv1", orderRoutes);
app.use("/apiv1", paymentRoutes);
app.use("/apiv1", reviewRoutes);
app.use("/apiv1", datasetRoutes);

app.get((req, res) => {
  res.status(404).send("Sorry, resource not found");
});

const PORT = process.env.PORT || 5001;

sequelize
  .sync()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`server running on port: http://localhost:${PORT}`);
    });
    const io = require("socket.io")(server);
    io.on("connection", (socket) => {
      console.log("client connected");
    });
  })
  .catch((err) => {
    console.log(err);
  });

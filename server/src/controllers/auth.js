const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("../../cloudinary");

const generateToken = (user) => {
  return jwt.sign(
    {
      email: user.email,
      id: user.id,
      admin: user.admin,
      firstName: user.first_name,
      lastName: user.last_name,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      email: user.email,
      id: user.id,
      admin: user.admin,
      firstName: user.first_name,
      lastName: user.last_name,
    },
    process.env.SECRET_REFRESHTOKEN_KEY,
    { expiresIn: "365d" }
  );
};

let refreshTokens = [];

exports.register = async (req, res, next) => {
  const { firstName, lastName, email, telephone, password, username } =
    req.body;

  const uploader = async (path) =>
    await cloudinary.uploads(path, "node-mystore");
  let url = "";
  if (req.method === "POST") {
    const { path } = req.file;
    url = await uploader(path);
  } else {
    res.status(405).json({
      err: "error",
    });
  }
  try {
    const existingUser = await User.findOne({ where: { username: username } });
    if (existingUser) {
      return res.status(400).json({
        message: "username đã tồn tại. mời sử dụng email khác để đăng ký",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await User.create({
      first_name: firstName,
      last_name: lastName,
      email,
      image: url.url,
      telephone,
      password: hashedPassword,
      username,
      admin: false,
    });
    const token = generateToken(user);
    res.status(201).json({
      user: user,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({
      where: { username: username },
    });
    if (!existingUser) {
      res.status(404).json({ message: "User not found " });
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      res.status(400).json({ message: "password is wrong" });
    }
    const token = generateToken(existingUser);
    const refreshToken = generateRefreshToken(existingUser);
    refreshTokens.push(refreshToken);
    res.cookie("redreshToken", refreshToken, {
      httpOnly: true,
      scure: true,
      path: "/",
      sameSite: "strict",
    });
    res.status(200).json({
      user: existingUser,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("refreshToken");
  refreshTokens = refreshTokens.filter(
    (token) => token !== req.cookies.refreshToken
  );
  res.status(200).json("Logout successfully");
};

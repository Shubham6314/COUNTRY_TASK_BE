const User = require("../models/user-model.js");
const ApiError = require("../utils/apiError.js");
const ApiResponse = require("../utils/apiResponse.js");

const generateToken = require("../utils/generateToken.js");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      throw new ApiError(400, "All fields are required.");
    }

    const existingUser = await User.findOne({
      email: email.trim().toLowerCase(),
    });
    if (existingUser) {
      throw new ApiError(400, "Email already exists.");
    }

    const user = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password.trim(),
    });

    const response = new ApiResponse(
      201,
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
      "User registered successfully."
    );

    return res.status(201).json(response);
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error);
    }

    console.error("Internal Server Error:", error);
    return res.status(500).json({
      status: "error",
      statusCode: 500,
      data: null,
      message: "Server Error. Please try again later.",
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        statusCode: 400,
        data: null,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({
        status: "fail",
        statusCode: 400,
        data: null,
        message: "Invalid email or password",
      });
    }

    return res.status(200).json({
      status: "success",
      statusCode: 200,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
      message: "User logged in successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      statusCode: 500,
      data: null,
      message: "Server Error",
    });
  }
};

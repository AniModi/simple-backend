const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const User = require("../models/User");

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    if (!user.isVerified) {
      const isPasswordValid = await bcrypt.compare(password, user.verificationCode);
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }
      user.isVerified = true;
      await user.save();

      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      return res.json({
        token,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function signUp(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(email);

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    const encodedCode = await bcrypt.hash(verificationCode.toString(), salt);
    let newUser = await User.create({
      email,
      password: hashedPassword,
      verificationCode : encodedCode,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_SECRET,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Email Verification",
      text: `Login with this code: ${verificationCode} as password`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function checkJwt(req, res) {
  const authorizationHeader = req.headers["authorization"];

  if (!authorizationHeader) {
    return res.status(401).json({
      auth: false,
      message: "No token provided.",
    });
  }

  const token = authorizationHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      return res.status(500).json({
        auth: false,
        message: "Failed to authenticate token.",
      });
    }

    res.status(200).json({
      auth: true,
      message: "Token is valid.",
    });
  });
}

module.exports = {
  loginUser,
  checkJwt,
  signUp,
};

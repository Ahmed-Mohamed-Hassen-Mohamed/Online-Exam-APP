const nodemailer = require("nodemailer");
const User = require("../models/user");

// Example controller functions

exports.sendEmail = async (req, res) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ahmedmeldeftar@gmail.com",
        pass: "blbevjggxzgtgwvv",
      },
    });
    let mailOptions = {
      from: "ahmedmeldeftar@gmail.com",
      to: req.body.email,
      subject: "Verify Your Email",
      html: `<p>Enter ${otp} in the app to verify your email address.</p>`,
    };
    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
      } else {
        res.status(200).send(otp);
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.signup = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = user.generateToken();
    res.status(200).send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = user.generateToken();
    res.status(200).send({ token });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getProfile = async (req, res) => {
  res.status(200).send(req.user);
};

exports.getUserById = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send("No user is found");
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateUserById = async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const user = req.user;
    updates.forEach((key) => {
      user[key] = req.body[key];
    });
    await user.save();
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const _id = req.user.id;
    const user = await User.deleteOne(_id);
    if (!user) {
      return res.status(404).send(" No user is found");
    }
    res.status(200).send("Delete success");
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("No acount has this email");
    }
    user.password = req.body.password;
    await user.save();
    const token = user.generateToken();
    res.status(200).send({ token });
  } catch (err) {
    res.status(500).send(err);
  }
};

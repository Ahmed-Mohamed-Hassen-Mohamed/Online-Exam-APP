const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decode = jwt.verify(token, process.env.API_KEY);
    const user = await User.findById({ _id: decode._id });
    req.user = user;
    
    next();
  } catch (err) {
    res.status(401).send(err);
  }
};
module.exports = userAuth;

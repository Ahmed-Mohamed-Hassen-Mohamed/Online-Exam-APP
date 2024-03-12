const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
    minlength: "3",
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    minlength: "3",
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate(value) {
      let regExp = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"
      );
      if (!regExp.test(value)) {
        throw new Error("Password must include (a-z) && (A-Z) && (0-9)");
      }
    },
  },
  role: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
});

userSchema.virtual("myGroups", {
  localField: "_id",
  foreignField: "owner",
  ref: "Group",
});

userSchema.virtual("groups", {
  localField: "_id",
  foreignField: "member",
  ref: "Join",
});

userSchema.virtual("exams", {
  localField: "_id",
  foreignField: "owner",
  ref: "Exam",
});

userSchema.virtual("myExam", {
  localField: "_id",
  foreignField: "owner",
  ref: "StartExam",
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 8);
  }
});
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Please check email or password");
  }
  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Please check email or password");
  }
  return user;
};
userSchema.methods.generateToken = function () {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.API_KEY);
  return token;
};
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

const User = mongoose.model("User", userSchema);
module.exports = User;

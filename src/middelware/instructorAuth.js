const requireInstructor = async (req, res, next) => {
    if (req.user.role != 1) {
      res.status(401).send({ error: "Not Instructor" });
    } else {
      next();
    }
  };
  module.exports = requireInstructor;
const Group = require("../models/group");

exports.addGroup = async (req, res) => {
  try {
    const group = new Group({ ...req.body, owner: req.user._id });
    group.image = req.file.buffer;
    await group.save();
    res.status(200).send(group);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getMyGroups = async (req, res) => {
  try {
    await req.user.populate("myGroups");
    if (!req.user.myGroups.length) {
      return res.status(404).send("No exam is found");
    }
    res.status(200).send(req.user.myGroups);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getGroupById = async (req, res) => {
  try {
    const _id = req.params.id;
    const group = await Group.findById(_id).populate("owner");
    if (!group) {
      return res.status(404).send("This group is not found");
    }
    res.status(200).send(group);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateGroupById = async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const _id = req.params.id;
    const group = await Group.findById(_id, req.body, {
      new: true,
    });
    if (!group) {
      return res.status(404).send("This group is not found");
    }
    updates.forEach((key) => {
      group[key] = req.body[key];
    });
    if (req.file) {
      group.image = req.file.buffer;
    }
    await group.save();
    res.status(200).send(group);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteGroupById = async (req, res) => {
  try {
    const _id = req.params.id;
    const group = await Group.findByIdAndDelete(_id);
    if (!group) {
      return res.status(404).send("This group is not found");
    }
    res.status(200).send(group);
  } catch (err) {
    res.status(500).send(err);
  }
};

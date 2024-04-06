const Join = require("../models/join");
const Group = require("../models/group");

exports.JoinGroup = async (req, res) => {
  try {
    const group = await Group.findOne({ code: req.body.code });
    if (!group) {
      return res.status(404).send("Invalid Code");
    }
    const _join = await Join.findOne({
      group: group._id,
      member: req.user._id,
    });
    if (_join) {
      return res.status(404).send("You are in this group");
    }
    const join = new Join({ group: group._id, member: req.user._id });
    await join.save();
    res.status(200).send(join);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getJoins = async (req, res) => {
  try {
    await req.user.populate("groups");
    const joins = req.user.groups;
    const groupIds = joins.map((join) => join.group);
    const groups = await Group.find({
      _id: { $in: groupIds },
    })
      .populate("owner")
      .sort({ _id: -1 });
    res.status(200).send(groups);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getMembers = async (req, res) => {
  try {
    const group = req.params.id;
    const members = await Join.find({ group }).populate("member");
    if (!members.length) {
      return res.status(404).send("No members are in that group");
    }
    res.status(200).send(members);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getJoinById = async (req, res) => {
  try {
    const _id = req.params.id;
    const join = await Join.findById(_id);
    if (!join) {
      return res.status(404).send("You are not found in that group");
    }
    res.status(200).send(join);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteJoinById = async (req, res) => {
  try {
    const _id = req.params.id;
    const join = await Join.findByIdAndDelete(_id);
    if (!join) {
      return res.status(404).send("You are not found in that group");
    }
    res.status(200).send(join);
  } catch (err) {
    res.status(500).send(err);
  }
};

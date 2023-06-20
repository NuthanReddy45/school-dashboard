const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const mongoose = require("mongoose");

const Result = require("../../models/results");
const { check, validationResult } = require("express-validator");

router.get("/:roll", auth, async (req, res) => {
  const filter = req.params.id;
  try {
    let resp = await Result.find({ rollNo: filter });
    res.json(resp);
  } catch (err) {
    console.log("error fetching result ", err);
    return res.send("error in geting results");
  }
});

router.post(
  "/",
  [check("rollNo", "Please include a Valid RollNo").notEmpty(), auth],
  async (req, res) => {
    console.log("in api  0");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, rollNum, fatherName, phoneNum, address, Class, fileUrl } =
      req.body;
    console.log("in api  ", fileUrl);
    const temp = {
      name: name ? name : "",
      rollNum: rollNum ? rollNum : "",
      fatherName: fatherName ? fatherName : "",
      phoneNum: phoneNum ? phoneNum : "",
      address: address ? address : "",
      Class: Class ? Class : "",
      ImageUrl: fileUrl ? fileUrl : "",
    };

    try {
      console.log(temp);
      const cur = new Student(temp);
      await cur.save();
      return res.json(cur);
    } catch (err) {
      console.log("error aading  students ", err);
      return res.status(500).send("error in adding students");
    }
  }
);
router.post("/:id", auth, async (req, res) => {
  const { name, rollNum, fatherName, phoneNum, address, Class } = req.body;
  const temp = {};
  if (name) temp.name = name;
  if (rollNum) temp.rollNum = rollNum;
  if (fatherName) temp.fatherName = fatherName;
  if (phoneNum) temp.phoneNum = phoneNum;
  if (address) temp.address = address;
  if (Class) temp.Class = Class;

  const id = req.params.id;

  let ans = mongoose.isValidObjectId(id);
  console.log(ans);

  try {
    let response = await Student.findById(id);

    if (response) {
      response = await Student.findOneAndUpdate(
        { user_id: id },
        { $set: temp },
        { new: true }
      );
      return res.json(response);
    }
    console.log("not found");
    return res.send("bad request").status(400);
  } catch (err) {
    console.log("error posting  students ", err);
    return res.status(500).send("error in posting students");
  }
});

router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    let resp = await Student.findById(id);
    if (!resp) {
      return res.status(400).send("No User Found ");
    }
    await resp.remove();
    resp = await Student.find();
    return res.json(resp);
  } catch (err) {
    console.log("error deleting students ", err);
    return res.status(500).send("error in deleting students");
  }
});

module.exports = router;
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const mongoose = require("mongoose");
const students = require("../../models/students");

const Student = require("../../models/students");
const { check, validationResult } = require("express-validator");

router.get("/", auth, async (req, res) => {
  try {
    let resp = await Student.find();
    res.json(resp);
  } catch (err) {
    console.log("error fetching students ", err);
    return res.send("error in geting students");
  }
});

router.post(
  "/",
  [
    check("name", "Please include a name").notEmpty(),
    check("rollNum", "Please include a Roll Number").notEmpty(),
    check("fatherName", "Please include a Father Name").notEmpty(),
    check("phoneNum", "Please include a Phone Number").notEmpty(),
    check("address", "Please include a Adress").notEmpty(),
    check("dob", "Please include Date of birth").notEmpty(),
    check("fileUrl", "Please include a Id Card").notEmpty(),
    auth,
  ],
  async (req, res) => {
    console.log("in api  0");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      rollNum,
      fatherName,
      section,
      branch,
      phoneNum,
      email1,
      email2,
      address,
      dob,
      fileUrl,
    } = req.body;
    console.log("in api  ", fileUrl);
    const temp = {
      name: name ? name : "",
      branch: branch ? branch : "",
      section: section ? section : "",
      email1: email1 ? email1 : "",
      email2: email2 ? email2 : "",
      rollNum: rollNum ? rollNum : "",
      fatherName: fatherName ? fatherName : "",
      phoneNum: phoneNum ? phoneNum : "",
      address: address ? address : "",
      dob: dob ? dob : "",
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
  const {
    name,
    rollNum,
    fatherName,
    phoneNum,
    address,
    dob,
    email1,
    email2,
    section,
    branch,
  } = req.body;
  const temp = {};
  if (name) temp.name = name;
  if (email1) temp.email1 = email1;
  if (email2) temp.email2 = email2;
  if (branch) temp.branch = branch;
  if (section) temp.section = section;
  if (rollNum) temp.rollNum = rollNum;
  if (fatherName) temp.fatherName = fatherName;
  if (phoneNum) temp.phoneNum = phoneNum;
  if (address) temp.address = address;
  if (dob) temp.dob = dob;

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

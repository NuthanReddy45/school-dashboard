const express = require("express");
const auth = require("../../middleware/auth");

const Teacher = require("../../models/teachers");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    let resp = await Teacher.find();
    res.json(resp);
  } catch (err) {
    console.log("error fetching teachers ", err);
    res.send("error in geting teachers");
  }
});

router.post("/", auth, async (req, res) => {
  const { name, subject, phoneNum, address, Class } = req.body;

  const cur = new Teacher({
    name,
    subject,
    phoneNum,
    address,
    Class,
  });

  try {
    await cur.save();
    let resp = await Teacher.find();
    return res.json(resp);
  } catch (err) {
    console.log("error posting  teachers ", err);
    return res.status(500).send("error in posting teachers");
  }
});

router.post("/:id", auth, async (req, res) => {
  const { name, subject, phoneNum, address, Class } = req.body;

  const temp = {};
  if (name) temp.name = name;
  if (subject) temp.subject = subject;
  if (phoneNum) temp.phoneNum = phoneNum;
  if (address) temp.address = address;
  if (Class) temp.Class = Class;

  const id = req.params.id;

  try {
    let response = await Teacher.findById(id);
    if (response) {
      response = await Teacher.findOneAndUpdate(
        { user_id: id },
        { $set: temp },
        { new: true }
      );
      return res.json(response);
    }
    console.log("not found");
    return res.send("bad request").status(400);
  } catch (err) {
    console.log("error posting  teachers ", err);
    return res.status(500).send("error in posting teachers");
  }
});

router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    let resp = await Teacher.findById(id);
    if (!resp) {
      return res.status(400).send("No User Found ");
    }
    await resp.remove();
    return res.status(200).send("Succesfully deleted the user");
  } catch (err) {
    console.log("error deleting teachers ", err);
    return res.status(500).send("error in deleting teachers");
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const mongoose = require("mongoose");

const Result = require("../../models/results");
const { check, validationResult } = require("express-validator");

router.get("/:roll", async (req, res) => {
  const gg = req.params.roll;
  try {
    let resp = await Result.find({ rollNo: gg });
    res.json(resp);
  } catch (err) {
    console.log("error fetching result ", err);
    return res.send("error in geting results");
  }
});

router.post(
  "/",
  //   [check("rollNo", "Please include a Valid RollNo").notEmpty(),auth],
  [check("rollNum", "Please include a Valid RollNo").notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { semesterRes, rollNum } = req.body;

    const tempRes = [semesterRes];
    const temp = {
      semRes: tempRes,
      rollNo: rollNum,
    };

    try {
      mongoose.set("strictQuery", true);
      const ans = await Result.find({ rollNo: rollNum });
      if (ans.length > 0) {
        const xy = ans[0];

        let key = 0;

        xy.semRes.forEach((sems, index) => {
          if (sems.semNo == semesterRes.semNo) {
            xy.semRes[index] = semesterRes;
            key = 1;
          }
        });

        if (key) {
          await xy.save();
          console.log("edited yeppi");
          return res.json(xy);
        }

        xy.semRes.push(semesterRes);
        await xy.save();
        return res.json(xy);
      }

      console.log("GG boi ", temp);
      const cur = new Result(temp);
      await cur.save();
      return res.json(cur);
    } catch (err) {
      console.log("error aading  students ", err);
      return res.status(500).send("error in adding students");
    }
  }
);

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

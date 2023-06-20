const mongoose = require("mongoose");

const nestedArraySchema = new mongoose.Schema({
  value: String,
});

const ResultSchema = new mongoose.Schema({
  rollNo: {
    type: String,
    required: true,
  },

  semRes: [[nestedArraySchema]],
});

module.exports = Result = mongoose.model("Results", ResultSchema);

const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  rollNo: {
    type: String,
    required: true,
  },

  semRes: [
    {
      semNo: { type: String },
      subjects: {},
    },
  ],
});

module.exports = Result = mongoose.model("Results", ResultSchema);

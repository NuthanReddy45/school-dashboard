const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  // name ,rollno(int),fatherName,phone (int),address,class(int)

  name: {
    type: String,
    // required: true,
  },
  branch: {
    type: String,
    // required: true,
  },
  section: {
    type: String,
    // required: true,
  },
  email1: {
    type: String,
    // required: true,
  },
  email2: {
    type: String,
    // required: true,
  },
  rollNum: {
    type: Number,
    required: true,
  },
  fatherName: {
    type: String,
    // required: true,
  },
  phoneNum: {
    type: Number,
    // required: true,
  },
  address: {
    type: String,
    // required: true,
  },
  dob: {
    type: Number,
    // required: true,
  },
  ImageUrl: {
    type: String,
  },
});

module.exports = Student = mongoose.model("Student", StudentSchema);

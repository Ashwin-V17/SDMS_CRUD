const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  name: String,
  mobile: Number,
  date: {
    type: Date,
    set: function (date) {
      // Extract only the date part
      const newDate = new Date(date);
      newDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0
      return newDate;
    },
  },
  age: String,
  address: String,
  district: String,
  division: String,
  taluk: String,
  sub1: Number,
  sub2: Number,
  sub3: Number,
  sub4: Number,
  sub5: Number,
  sub6: Number,
  total: Number,
  avg: Number,
  randomVal: String,
});
const studentModel = mongoose.model("student", studentSchema);
module.exports = studentModel;

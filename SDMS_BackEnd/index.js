const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const studentModel = require("./models/Students");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("./models/Admin");
const path = require("path");
const authMiddleware = require("./authMiddleware");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
console.log(JWT_SECRET);
app.use(cors());
app.use(express.json());

const frontendPath = path.join(__dirname, "../SDMS_FrontEnd/dist");
app.use(express.static(frontendPath));
//? Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI, {})
  .then(() =>
    app.listen(3000, () => console.log("Server running on port 3000"))
  )
  .catch((err) => console.log(err));

//? Admin check
app.post("/api/login", async (req, res) => {
  console.log("login request");
  const { username, password } = req.body;
  console.log(`username : ${username}, Pwd : ${password} `);
  try {
    const admin = await Admin.findOne({ username });
    console.log(admin);
    if (!admin) {
      console.log("username not matching");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // const isMatch = await bcrypt.compare(password, admin.password);
    if (!password) {
      console.log("password not Matching");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, isAdmin: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//? Authenticating
app.get("/protected-route", authMiddleware, (req, res) => {
  res.status(200).json({ message: "You have access to this route" });
});

//? Create a new student
app.post("/api/create", async (req, res) => {
  try {
    const student = new studentModel(req.body);
    const result = await student.save();
    console.log(req.body);
    console.log("Data saved");
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//? Fetch data by acknowledgement number
app.get("/api/getByNumber/:acknowledgement", async (req, res) => {
  try {
    const student = await studentModel.findOne({
      randomVal: req.params.acknowledgement,
    });
    if (!student) {
      return res.status(404).json({ error: "Student Not Found" });
    }
    res.status(200).json(student);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//? Fetch data for update by acknowledgement number
app.get("/api/updateByAcknowledge/:acknowledgement", async (req, res) => {
  try {
    const student = await studentModel.findOne({
      randomVal: req.params.acknowledgement,
    });
    if (!student) {
      return res.status(404).json({ error: "Student Not Found" });
    }
    res.status(200).json(student);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//? Update data by acknowledgement number
app.put("/api/saveUpdate/:acknowledgement", async (req, res) => {
  try {
    const acknowledgement = req.params.acknowledgement;
    const updateData = req.body;
    delete updateData.randomVal;
    const updatedStudent = await studentModel.findOneAndUpdate(
      { randomVal: acknowledgement },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: "Student Not Found" });
    }

    res.status(200).json(updatedStudent);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a student by phone number
app.delete("/api/deleteByPhone/:phNo", async (req, res) => {
  try {
    const phoneNo = req.params.phNo;
    const result = await studentModel.findOne({ mobile: phoneNo });
    if (!result) {
      return res.status(404).json({ error: "Student Not Found" });
    }

    await studentModel.deleteOne({ _id: result._id });
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("*", (req, res) => {
  if (req.originalUrl.startsWith("/api/")) {
    res.status(404).send("API route not found");
  } else {
    res.sendFile(path.join(frontendPath, "index.html"));
  }
});

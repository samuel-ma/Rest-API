

const express = require("express");
const User = require("../models/User");
const router = express.Router();

//create a new user
router.post("/adduser", async (req, res) => {
  const { username, email, age, gender, birthday } = req.body;
  console.log(birthday);
  try {
    const Userexist = await User.findOne({ email });
    if (Userexist) {
      return res.status(400).json({ msg: "user already exists" });
    }
    const user = new User({ username, email, age, gender, birthday });
    await user.save();
    res.status(201).json({ msg: "user created", user });
  } catch (error) {
    res.status(500).send("server error");
  }
});

//get all users
router.get("/allusers", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ msg: "all users", users });
  } catch (error) {
    res.status(500).send("server error");
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted" });
  } catch (error) {
    res.status(500).send("server error");
  }
});

//update user
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updateuser = await User.findByIdAndUpdate(
      id,
      { $set: { ...req.body } },
      { new: true }
    );
    res.status(200).json({ msg: "user updated", updateuser });
  } catch (error) {
    res.status(500).send("server error");
  }
});

//get one user
router.get("/getuser/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json({ msg: "user ", user });
  } catch (error) {
    res.status(500).send("server error");
  }
});

module.exports = router;


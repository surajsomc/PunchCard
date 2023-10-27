const PunchCard = require("../models/punchcardModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const generateRandomKey = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomKey = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomKey += characters.charAt(randomIndex);
  }
  return randomKey;
};

const getAllPunchcards = async (req, res) => {
  const user_id = req.user._id;

  const punchcards = await PunchCard.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json({ punchcards });
};

const getSinglePunchcard = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Punchcard not found" });
  }

  const punchCard = await PunchCard.findById(id);
  if (!punchCard) {
    return res.status(404).json({ error: "Punchcard not found" });
  }
  res.status(200).json({ punchCard });
};

const createPunchcard = async (req, res) => {
  const { punchcardHours } = req.body;

  if (!punchcardHours) {
    return res.status(400).json({ error: "Punchcard hours required" });
  }

  try {
    const punchcardKey = generateRandomKey(8);
    const user_id = req.user._id;

    const punchcard = await PunchCard.create({
      punchcardHours,
      punchcardKey,
      user_id,
    });
    res.status(201).json({ punchcard });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePunchcard = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Punchcard not found" });
  }

  const punchcard = await PunchCard.findOneAndDelete({ _id: id });

  if (!punchcard) {
    return res.status(404).json({ error: "Punchcard not found" });
  }

  res.status(200).json({ punchcard });
};

const updatePunchcard = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Punchcard not found" });
  }

  const punchcard = await PunchCard.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!punchcard) {
    return res.status(404).json({ error: "Punchcard not found" });
  }

  res.status(200).json({ punchcard });
};

module.exports = {
  getAllPunchcards,
  getSinglePunchcard,
  createPunchcard,
  deletePunchcard,
  updatePunchcard,
};

const express = require("express");
const {
  createPunchcard,
  getSinglePunchcard,
  updatePunchcard,
  deletePunchcard,
  getAllPunchcards,
} = require("../controllers/punchcardController");
const requireAuth = require("../middleware/requireAuth");

const router_2 = express.Router();

router_2.use(requireAuth);

router_2.get("/", getAllPunchcards);

router_2.get("/:id", getSinglePunchcard);

router_2.post("/", createPunchcard);

router_2.delete("/:id", deletePunchcard);

router_2.patch("/:id", updatePunchcard);

module.exports = router_2;

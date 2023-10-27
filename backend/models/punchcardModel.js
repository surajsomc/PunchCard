const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const punchcardSchema = new Schema(
  {
    punchcardHours: {
      type: Number,
      required: true,
    },
    punchcardKey: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Punchcard", punchcardSchema);

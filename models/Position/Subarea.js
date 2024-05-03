const { Schema, model } = require("mongoose");

const subareaSchema = new Schema(
  {
    name: {
      type: String,
    },
    area: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Subarea", subareaSchema);

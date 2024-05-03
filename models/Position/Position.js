const { Schema, model } = require("mongoose");

const positionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Position", positionSchema);

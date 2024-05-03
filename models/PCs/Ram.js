const { Schema, model } = require("mongoose");

const ramSchema = new Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    ddr: {
      type: String,
      required: true,
    },
    speed: {
      type: Number,
      required: true,
    },
    volume: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("RAM", ramSchema);

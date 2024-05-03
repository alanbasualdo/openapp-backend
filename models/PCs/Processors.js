const { Schema, model } = require("mongoose");

const processorsSchema = new Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    speed: {
      type: Number,
      required: true,
    },
    graph: {
      type: String,
      required: true,
    },
    cores: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Processors", processorsSchema);

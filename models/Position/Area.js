const { Schema, model } = require("mongoose");

const areaSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Area", areaSchema);

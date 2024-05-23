const { Schema, model } = require("mongoose");

const areaSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    haveTickets: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Area", areaSchema);

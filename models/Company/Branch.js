const { Schema, model } = require("mongoose");

const branchSchema = new Schema(
  {
    city: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Branch", branchSchema);

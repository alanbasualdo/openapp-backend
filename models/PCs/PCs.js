const { Schema, model } = require("mongoose");

const pcsSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    model: {
      type: Schema.Types.ObjectId,
      ref: "Models",
      default: null,
    },
    disk: {
      type: Schema.Types.ObjectId,
      ref: "Disks",
      required: true,
    },
    ram: {
      type: Schema.Types.ObjectId,
      ref: "RAM",
      required: true,
    },
    processor: {
      type: Schema.Types.ObjectId,
      ref: "Processors",
      required: true,
    },
    serialNumber: {
      type: String,
      required: true,
    },
    graphicCard: {
      type: String,
    },
    employee: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("PCs", pcsSchema);

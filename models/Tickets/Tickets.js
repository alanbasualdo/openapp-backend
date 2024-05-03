const { Schema, model } = require("mongoose");

const ticketsSchema = new Schema(
  {
    area: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    attachments: {
      type: [String],
    },
    observers: {
      type: [String],
    },
    createdBy: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "Pendiente",
    },
    priority: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Tickets", ticketsSchema);

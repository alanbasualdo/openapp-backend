const { Schema, model } = require("mongoose");

const ticketsSchema = new Schema(
  {
    area: {
      type: Schema.Types.ObjectId,
      ref: "Area",
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Categories",
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
    observers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    attachments: {
      type: [String],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      default: "Pendiente",
    },
    priority: {
      type: Number,
      default: "2",
    },
    takenBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Tickets", ticketsSchema);

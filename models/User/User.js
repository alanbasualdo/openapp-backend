const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    lastName: {
      type: String,
    },
    cuil: {
      type: Number,
    },
    birthdate: {
      type: Date,
    },
    gender: {
      type: String,
    },
    userName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    admissionDate: {
      type: Date,
    },
    departureDate: {
      type: Date,
    },
    payroll: {
      type: String,
    },
    branch: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
    },
    area: {
      type: Schema.Types.ObjectId,
      ref: "Area",
    },
    subarea: {
      type: Schema.Types.ObjectId,
      ref: "Subarea",
    },
    position: {
      type: Schema.Types.ObjectId,
      ref: "Position",
    },
    permissions: {
      type: String,
    },
    state: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);

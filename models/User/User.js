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
      type: String,
    },
    city: {
      type: String,
    },
    position: {
      type: String,
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

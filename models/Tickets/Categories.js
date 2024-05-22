const { Schema, model } = require("mongoose");

const categoriesSchema = new Schema(
  {
    area: {
      type: Schema.Types.ObjectId,
      ref: "Area",
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Categories", categoriesSchema);

const {
  postBrand,
  getBrands,
  deleteBrand,
} = require("../../controllers/companies/brands");

const router = require("express").Router();

router.post("/post-brand", postBrand);

router.get("/get-brands", getBrands);

router.delete("/delete-brand/:id", deleteBrand);

module.exports = router;

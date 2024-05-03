const {
  postCompany,
  getCompanies,
  deleteCompany,
} = require("../../controllers/companies/companies");

const router = require("express").Router();

router.post("/post-company", postCompany);

router.get("/get-companies", getCompanies);

router.delete("/delete-company/:id", deleteCompany);

module.exports = router;

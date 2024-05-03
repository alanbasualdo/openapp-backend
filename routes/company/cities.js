const { postCity, getCities, deleteCity } = require("../../controllers/companies/cities");

const router = require("express").Router();

router.post("/post-city", postCity);

router.get("/get-cities", getCities);

router.delete("/delete-city/:id", deleteCity);

module.exports = router;

const { postArea, getAreas, deleteArea } = require("../../controllers/positions/areas");

const router = require("express").Router();

router.post("/post-area", postArea);

router.get("/get-areas", getAreas);

router.delete("/delete-area/:id", deleteArea);

module.exports = router;

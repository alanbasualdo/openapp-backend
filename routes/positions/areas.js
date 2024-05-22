const {
  postArea,
  getAreas,
  deleteArea,
} = require("../../controllers/positions/areas");
const { checkJWT } = require("../../helpers/generateJWT");

const router = require("express").Router();

router.post("/post-area", checkJWT, postArea);

router.get("/get-areas", checkJWT, getAreas);

router.delete("/delete-area/:id", checkJWT, deleteArea);

module.exports = router;

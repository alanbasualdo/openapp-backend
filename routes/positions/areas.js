const {
  postArea,
  getAreas,
  deleteArea,
  putArea,
} = require("../../controllers/positions/areas");
const { checkJWT } = require("../../helpers/generateJWT");

const router = require("express").Router();

router.post("/post-area", checkJWT, postArea);

router.get("/get-areas", checkJWT, getAreas);

router.put("/put-area/:id", checkJWT, putArea);

router.delete("/delete-area/:id", checkJWT, deleteArea);

module.exports = router;

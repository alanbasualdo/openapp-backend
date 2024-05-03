const {
  postPosition,
  getPositions,
  deletePosition,
  putPosition,
} = require("../../controllers/positions/positions");

const router = require("express").Router();

router.post("/post-position", postPosition);

router.get("/get-positions", getPositions);

router.delete("/delete-position/:id", deletePosition);

router.put("/put-position/:id", putPosition);

module.exports = router;

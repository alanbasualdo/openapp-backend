const {
  postSubarea,
  getSubareas,
  deleteSubareas,
} = require("../../controllers/positions/subareas");

const router = require("express").Router();

router.post("/post-subarea", postSubarea);

router.get("/get-subareas", getSubareas);

router.delete("/delete-subarea/:id", deleteSubareas);

module.exports = router;

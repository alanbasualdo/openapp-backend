const {
  postModel,
  getModels,
  deleteModel,
} = require("../../controllers/pcs/models");

const router = require("express").Router();

router.post("/post-model", postModel);

router.get("/get-models", getModels);

router.delete("/delete-model/:id", deleteModel);

module.exports = router;

const {
  postProcessor,
  getProcessors,
  deleteProcessor,
} = require("../../controllers/pcs/processors");

const router = require("express").Router();

router.post("/post-processor", postProcessor);

router.get("/get-processors", getProcessors);

router.delete("/delete-processor/:id", deleteProcessor);

module.exports = router;

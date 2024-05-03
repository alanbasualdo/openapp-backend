const {
  postDisk,
  getDisks,
  deleteDisk,
} = require("../../controllers/pcs/disks");

const router = require("express").Router();

router.post("/post-disk", postDisk);

router.get("/get-disks", getDisks);

router.delete("/delete-disk/:id", deleteDisk);

module.exports = router;

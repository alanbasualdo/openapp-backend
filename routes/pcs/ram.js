const { postRam, getRam, deleteRam } = require("../../controllers/pcs/ram");

const router = require("express").Router();

router.post("/post-ram", postRam);

router.get("/get-rams", getRam);

router.delete("/delete-ram/:id", deleteRam);

module.exports = router;

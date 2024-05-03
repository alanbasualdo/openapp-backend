const { postPC, getPCs, deletePC } = require("../../controllers/pcs/pcs");

const router = require("express").Router();

router.post("/post-computer", postPC);

router.get("/get-computers", getPCs);

router.delete("/delete-computer/:id", deletePC);

module.exports = router;

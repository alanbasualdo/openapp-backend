const router = require("express").Router();
const { getFile } = require("../controllers/attachments");
const { checkJWT } = require("../helpers/generateJWT");

router.get("/:filename", checkJWT, getFile);

module.exports = router;

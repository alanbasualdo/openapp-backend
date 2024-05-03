const { postUser, getUsers } = require("../../controllers/users/userController");

const router = require("express").Router();

router.post("/post", postUser);

router.get("/", getUsers);

module.exports = router;

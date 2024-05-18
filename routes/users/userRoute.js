const {
  postUser,
  getUsers,
  putUser,
} = require("../../controllers/users/userController");
const { checkJWT } = require("../../helpers/generateJWT");
const uploadFile = require("../../middlewares/multer");

const router = require("express").Router();

router.post("/post-user", checkJWT, uploadFile, postUser);

router.get("/", getUsers);

router.put("/put-user/:id", checkJWT, uploadFile, putUser);

module.exports = router;

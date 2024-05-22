const {
  postCategory,
  getCategories,
  deleteCategory,
  getCategoriesByArea,
} = require("../../controllers/tickets/categories");
const { checkJWT } = require("../../helpers/generateJWT");

const router = require("express").Router();

router.post("/post-category", checkJWT, postCategory);

router.get("/get-categories", checkJWT, getCategories);

router.get("/get-categories/:areaID", checkJWT, getCategoriesByArea);

router.delete("/delete-category/:id", checkJWT, deleteCategory);

module.exports = router;

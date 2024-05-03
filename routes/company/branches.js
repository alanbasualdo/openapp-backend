const {
  postBranch,
  getBranches,
  deleteBranch,
} = require("../../controllers/companies/branches");

const router = require("express").Router();

router.post("/post-branch", postBranch);

router.get("/get-branches", getBranches);

router.delete("/delete-branch/:id", deleteBranch);

module.exports = router;

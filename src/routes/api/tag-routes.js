const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint
const {
  getAllTags,
  getTag,
  createTag,
  updateTag,
  deleteTag,
} = require("../../controllers/tag-routes");

router.get("/", getAllTags);

router.get("/:id", getTag);

router.post("/", createTag);

router.put("/:id", updateTag);

router.delete("/:id", deleteTag);

module.exports = router;

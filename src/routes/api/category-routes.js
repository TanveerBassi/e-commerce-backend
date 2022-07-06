const router = require("express").Router();
const { Category, Product } = require("../../models/Category");

const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../../controllers/category-routes");

router.get("/", getAllCategories);

router.get("/:id", getCategory);

router.post("/", createCategory);

router.put("/:id", updateCategory);

router.delete("/:id", deleteCategory);

module.exports = router;

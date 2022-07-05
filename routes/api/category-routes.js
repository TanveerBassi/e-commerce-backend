const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// The `/api/categories` endpoint

router.get("/", getAllCategories);

router.get("/:id", getCategory);

router.post("/", createCategory);

router.put("/:id", updateCategory);

router.delete("/:id", deleteCategory);

module.exports = router;

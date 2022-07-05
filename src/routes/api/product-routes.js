const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// get all products
router.get("/", getAllProducts);

// get one product
router.get("/:id", getProduct);

// create new product
router.post("/", createProduct);

// update product
router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;

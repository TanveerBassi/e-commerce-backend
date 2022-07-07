const router = require("express").Router();
const { Category, Product } = require("../../models");

router.get("/", async (req, res) => {
  // find all categories
  try {
    const categories = await Category.findAll({
      include: [
        { model: Product, attributes: ["product_name", "price", "stock"] },
      ],
    });
    if (!categories) {
      return res.status(500).json({ message: "Categories not found" });
    }
    return res.json(categories);
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id, {
      include: [
        { model: Product, attributes: ["product_name", "price", "stock"] },
      ],
    });
    if (!category) {
      return res.status(404).json({ message: "Categories not found" });
    }
    return res.json(category);
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  // create a new category - passing it an object with the key category_name in it >> object=req.body
  try {
    const { category_name } = req.body;
    if (!category_name) {
      return res.status(400).json({ message: "Unable to create category" });
    }
    const category = await Category.create(req.body);
    return res
      .status(200)
      .json({ message: "Category created", newCategory: category });
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  // update a category - find it first by its `id`. If exists, pass it an object with the new category_name in it and the id
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const { category_name } = req.body;
    if (!category_name) {
      return res.status(500).json({ message: "Unable to update category" });
    }
    await Category.update({ category_name }, { where: { id } });

    return res.status(200).json({ message: "Category updated" });
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value -  find it first then destroy it
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await Category.destroy({ where: { id } });
    return res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
});

module.exports = router;

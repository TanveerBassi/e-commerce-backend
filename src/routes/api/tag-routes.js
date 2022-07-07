const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint
router.get("/", async (req, res) => {
  // find all tags
  try {
    const tags = await Tag.findAll({
      include: [
        { model: Product, attributes: ["product_name", "price", "stock"] },
      ],
    });
    if (!tags) {
      return res.status(500).json({ message: "Tags not found" });
    }
    return res.json(tags);
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  try {
    const { id } = req.params;
    const tag = await Tag.findByPk(id, {
      include: [
        { model: Product, attributes: ["product_name", "price", "stock"] },
      ],
    });
    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }
    return res.json(tag);
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  // create a new tag - passing it an object with the key tag_name in it >> object=req.body
  try {
    const { tag_name } = req.body;
    if (!tag_name) {
      return res.status(400).json({ message: "Unable to create tag" });
    }
    const tag = await Tag.create(req.body);
    return res.status(200).json({ message: "Tag created", newTag: tag });
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name - find it first by its `id`. If exists, pass it an object with the new tag_name in it and the id
  try {
    const { id } = req.params;
    const tag = await Tag.findByPk(id);

    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    const { tag_name } = req.body;
    if (!tag_name) {
      return res.status(500).json({ message: "Unable to update tag" });
    }
    await Tag.update({ tag_name }, { where: { id } });

    return res.status(200).json({ message: "Tag updated" });
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a tag by its `id` value -  find it first then destroy it
  try {
    const { id } = req.params;
    const tag = await Tag.findByPk(id);

    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    await Tag.destroy({ where: { id } });
    return res.status(200).json({ message: "Tag deleted" });
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
});

module.exports = router;

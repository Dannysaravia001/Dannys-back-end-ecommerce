const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// get all products
router.get("/", async (req, res) => {
  try {
    const allProducts = await Product.findAll({ include: [Category, Tag] });
    res.status(200).json(allProducts);
  } catch (error) {
    console.log(error); // Added error logging
    res.status(500).json({ error: "Internal server error" });
  }
});

// get one product
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const singleProduct = await Product.findOne({
      where: { id: id },
      include: [Category, Tag],
    });
    if (singleProduct) {
      res.status(200).json(singleProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log(error); // Added error logging
    res.status(500).json({ error: "Internal server error" });
  }
});

// create new product
router.post("/", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: newProduct.id,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(productTagIdArr); // Changed to await to ensure product creation before adding tags
    }
    res.status(200).json(newProduct);
  } catch (error) {
    console.log(error); // Added error logging
    res.status(400).json(error);
  }
});

// update product
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Product.update(req.body, {
      where: { id: id },
    });
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTags = await ProductTag.findAll({
        where: { product_id: id },
      });
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: id,
            tag_id,
          };
        });
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);
      await ProductTag.destroy({ where: { id: productTagsToRemove } });
      await ProductTag.bulkCreate(newProductTags);
    }
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.log(error); // Added error logging
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productDeleted = await Product.destroy({ where: { id: id } });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error); // Added error logging
    res.status(400).json(error);
  }
});

module.exports = router;
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
 
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const allCategories = await Category.findAll({include: [Product] });
    res.status(200).json(allCategories);
  } catch (error) {
    res.status(500).json({ error: "Internal server error"})
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const singleCategory = await Category.findOne({
        where: { id: id },
        include: [Product],
      });
      if (singleCategory) {
        res.status(200).json(singleCategory);
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const { id } = req.params; 
    const [updatedCategory] = await Category.update(req.body,{
      where: { id: id }
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const { id } = req.params;
    const deletedRows = await Category.destroy({ where: { id: id } });
    if (deletedRows > 0) {
      res.status(200).json({ message: "Category deleted successfully" });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;

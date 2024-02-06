const router = require('express').Router();
const { endsWith } = require('sequelize/types/lib/operators');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    // Find all tags and include associated Product data
    const allTags = await Tag.findAll({ include: [Product] });
    res.status(200).json(allTags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  router.get('/:id', async (req, res) => {
    // find a single tag by its `id`
    // be sure to include its associated Product data
    try {
      const { id } = req.params;
      const singleTag = await Tag.findOne({
        where: { id: id }, 
        include: [Product],
      });
      if (singleTag) {
        res.status(200).json(singleTag);
      } else {
        res.status(404).json({ message: 'Tag not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;

const router = require('express').Router();
const { endsWith } = require('sequelize/types/lib/operators');
const { Tag, Product, ProductTag } = require('../../models');
const { error } = require('formatter');

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

router.post('/', async (req, res) => {
  try {
    // Create a new tag
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const { id } = req.params;
    const updatedTag = await Tag.update( req.body, {
      where: { id: id },
    });
    res.status(200).json({ message: 'Tag updated succesfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  router.delete('/:id', async (req, res) => {
    // delete on tag by its `id` value
    try {
      const { id } = req.params; 
      const deletedRows = await Tag.destroy({
        where: { id: id },
      });
      if (deletedRows > 0 ) {
        res.status(200).json({ message: 'Tag deleted successfully' });
      } else { 
        console.log(error); 
        res.status(404).json({ message: 'Tag not found'})
      }
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  });
});

module.exports = router;

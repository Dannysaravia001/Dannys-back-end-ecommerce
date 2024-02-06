const router = require('express').Router();
const { Tag, Product } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    // Find all tags and include associated Product data
    const allTags = await Tag.findAll({ include: [Product] });
    res.status(200).json(allTags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
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
  try {
    const { id } = req.params;
    const updatedTag = await Tag.update(req.body, {
      where: { id: id },
    });
    res.status(200).json({ message: 'Tag updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params; 
    const deletedRows = await Tag.destroy({
      where: { id: id },
    });
    if (deletedRows > 0 ) {
      res.status(200).json({ message: 'Tag deleted successfully' });
    } else { 
      res.status(404).json({ message: 'Tag not found'});
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

module.exports = router;
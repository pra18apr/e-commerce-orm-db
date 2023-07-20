const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagMulti = await Tag.findAll({
      include:
      [
        {model: Product}
      ],
    });
    res.status(200).json(tagMulti);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagMulti = await Tag.findByPk(req.params.id, {
      include: [
        { model: Product }
      ],
    });
    res.status(200).json(tagMulti);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
    // create a new tag
    try {
      const tagMulti = await Tag.create(req.body);
      res.status(200).json(tagMulti);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
  try {
    const tagMulti = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(tagMulti);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try { await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json();
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

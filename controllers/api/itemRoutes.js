// TODO: Change all instances of 'project' to 'item' (keep same pluralization & capitalization)

const router = require('express').Router();
const { Item } = require('../../models');
const withAuth = require('../../utils/auth');
const parser = require('../../utils/cloudinary');

router.post('/', withAuth, parser.single('image'), async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const imageUrl = req.file ? req.file.secure_url : null;
    const newItem = await Item.create({
      ...req.body,
      user_id: req.session.user_id,
      image: imageUrl,
    });
    console.log("New Item:", newItem);

    res.status(200).json(newItem);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const itemData = await Item.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!itemData) {
      res.status(404).json({ message: 'No item was found with this id!' });
      return;
    }

    res.status(200).json(itemData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

const router = require('express').Router();
const { Item } = require('../../models');
const withAuth = require('../../utils/auth');
const parser = require('../../utils/cloudinary');
const cloudinary = require('cloudinary').v2;

// Create new item from form
router.post('/', withAuth, parser.single('image'), async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const imageUrl = req?.file?.path || null;
    // const imageUrl = req.file ? req.file.secure_url : null;

    const newItem = await Item.create({
      ...req.body,
      user_id: req.session.user_id,
      image: imageUrl,
    });
    console.log('New Item:', newItem);

    res.status(200).json(newItem);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete existing item from list
router.delete('/:id', withAuth, parser.single('image'), async (req, res) => {
  try {
    const itemData = await Item.findByPk(req.params.id);

    if (!itemData) {
      res.status(404).json({ message: 'No item was found with this id!' });
      return;
    }

    // Delete image from Cloudinary storage
    await cloudinary.v2.uploader.destroy(itemData.imagePublicId).then(
      res.status(200).json({
        message: 'Item deleted from Cloudinary',
      })
    );

    await Item.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    }).then(
      res.status(200).json({
        message: 'Item deleted from DB',
      })
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const itemData = await Item.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!itemData) {
//       res.status(404).json({ message: 'No item was found with this id!' });
//       return;
//     }

//     res.status(200).json(itemData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;

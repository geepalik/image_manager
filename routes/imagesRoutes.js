const express = require('express');

const imagesController = require('../controllers/imagesController');

const router = express.Router();

//GET /images
//one with id or all images
router.get('/images/:imageId*?',imagesController.getImage);

//POST /images/upload_image
router.post('/upload_image',imagesController.uploadImage);

//PUT /images/replace_image
router.put('/update_image',imagesController.replaceImage);

//DELETE /images/delete_image
router.delete('/images/:imageId',imagesController.deleteImage);

module.exports = router;
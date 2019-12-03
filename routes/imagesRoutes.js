const express = require('express');

const imagesController = require('../controllers/imagesController');

const router = express.Router();

//GET /images/get_images
router.get('/get_images',imagesController.getImages);

//GET /images/get_image_data
router.get('/get_image_data',imagesController.getImageData);

//POST /images/upload_image
router.post('/upload_image',imagesController.uploadImage);

//PUT /images/replace_image
router.put('/update_image',imagesController.replaceImage);

module.exports = router;
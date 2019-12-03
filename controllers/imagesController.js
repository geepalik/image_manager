const fs = require('fs');
const path = require('path');
const Image = require('../models/imageModel');

exports.getImages = (req, res, next) => {
    Image
    .fetchAll()
    .then(images => {
        res
        .status(200)
        .json({message: 'Fetch images ok', images: images[0]});
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
};

exports.getImageData = (req, res, next) => {
    const imageId = req.body.image_id;
    Image.findById(imageId)
    .then(imageData => {    
        res
        .status(200)
        .json({message: 'Fetch images ok', imageData: imageData[0][0]});})
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.replaceImage = (req, res, next) => {
    if(!req.file){
        res.status(422).json({status: 'error',message: 'No image provided, only pngs allowed' });
    }
    const imageId = req.body.image_id;
    const imageName = req.body.image_name;
    const imageGroup = req.body.image_group;

    //in case we dont update image and arrives as text from form
    let imageUrl = req.body.image_file;
    if(req.file){
        imageUrl = req.file.path.replace("\\","/");
    }

    if(!imageUrl){
        const error = new Error('No file picked');
        error.statusCode = 422;
        throw error;
    }

    Image
    .findById(imageId)
    .then(oldImageData => {
        if(!oldImageData){
            const error = new Error("Could not find image with those data");
            error.statusCode = 404;
            throw error;
        }
        
        if(req.file){
            clearImage(oldImageData[0][0].image_file);
        }
        
        imageUrl = imageUrl.replace("\\","/");

        const newImage = new Image(imageId,imageName,imageGroup,imageUrl);
        return newImage.update();
    })
    .then(() => {
        res.status(200).json({message: 'Image updated!'});
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        //continue to next middleware
        next(err);
    });

};

exports.uploadImage = (req, res, next) => {
    if(!req.file){
        res.status(422).json({status: 'error',message: 'No image provided, only pngs allowed' });
    }
    
    const imageName = req.body.image_name;
    const imageGroup = req.body.image_group;
    //unix
    //const imageUrl = req.file.path;
    //windows
    const imageUrl = req.file.path.replace("\\","/");

    const image = new Image(null,imageName,imageGroup,imageUrl);
    image
    .save().
    then(result => {
        image.id = result[0].insertId;
        res.status(201).json({
            message: 'OK!',
            image: image,
        });
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.deleteImage = (req, res, next) => {
    const imageId = req.body.image_id;
    console.log(imageId);
    Image.findById(imageId)
    .then(imageData => {  
        if(!imageData){
            const error = new Error('Could not find image');
            error.statusCode = 404;
            throw error;
        }
        clearImage(imageData[0][0].image_file);
        return Image.deleteById(imageId);
    })
    .then(() =>{
        res.status(200).json({message: 'Image deleted!'});
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
};

/**
 * delete previous image
 * function accepts filepath as argument
 */
const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, (err) => {
        if(err){
            console.log('Error in deleting image: '+err+ ' of path '+filePath);
            throw err;
        }
    });
};
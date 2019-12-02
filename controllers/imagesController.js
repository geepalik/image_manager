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
    const imageName = req.body.image_name;
    Image.findByName(imageName)
    .then(imageData => {       
        res
        .status(200)
        .json({message: 'Fetch images ok', imageData: imageData[0]});})
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.replaceImage = (req, res, next) => {
    const imageName = req.body.image_name;
    Image
    .findByName(imageName)
    .then(imageData => {
        ////console.log(imageData[0]);
        //if image was found, init new image with data
        //update row with new data
        //delete old image
    })
    .then()
    .cath();

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
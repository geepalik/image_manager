const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const imagesRoutes = require('./routes/imagesRoutes');
const app = express();

//x-www-form-urlencoded <form>
app.use(bodyParser.urlencoded({extended: true}));

//json requests, application/json
//app.use(bodyParser.json());

const fileStorage = multer.diskStorage({
    //request object
    //information on the file
    //callback for destination
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        //filename
        //for unix based systems
        //cb(null, new Date().toISOString() + '-'+ file.originalname);
        //windows
        let extension = file.originalname.split('.').pop();
        cb(null, uuidv4()+'.'+extension);
    }
});
/**
 * filter to check file MIME type
 */
const fileFilter = (req, file, cb) => {
    if(
        file.mimetype === 'image/png'
    ){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

app.use(
    multer({storage: fileStorage, fileFilter: fileFilter}).single('image_file')
);

app.use('/images',express.static(path.join(__dirname,'images')));

app.use((req, res, next) => {
    //allow access from every, elminate CORS
    res.setHeader('Access-Control-Allow-Origin','*');
    //set the allowed HTTP methods to be requested
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE');
    //headers clients can use in their requests
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    //allow request to continue and be handled by routes
    next();
});

app.use('/image_service',imagesRoutes);

app.listen(8080);
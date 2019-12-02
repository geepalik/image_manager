const db = require('../util/mysql');

module.exports = class Image {
    constructor(id, imageName, imageGroup, imageFile){
        this.id = id;
        this.imageName = imageName;
        this.imageGroup = imageGroup;
        this.imageFile = imageFile;
    }

    save() {
        return db.execute(
            'INSERT INTO images (image_name, image_group, image_file) VALUES (?, ?, ?)',
            [this.imageName, this.imageGroup, this.imageFile]
        );
    }

    update(){
        return db.execute(
            'UPDATE images SET image_name'
        )
    }

    static findByName(imageName){
        return db.execute(
            'SELECT * FROM images WHERE image_name = ?',
            [imageName]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM images');
    }
}
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
            'UPDATE images SET image_name = ?, image_group = ?, image_file = ? WHERE id = ?',
            [this.imageName, this.imageGroup, this.imageFile, this.id]
        )
    }

    static findById(imageId){
        return db.execute(
            'SELECT * FROM images WHERE id = ?',
            [imageId]
        );
    }

    static deleteById(imageId){
        return db.execute(
            'DELETE FROM images WHERE id = ?',
            [imageId]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM images');
    }
}
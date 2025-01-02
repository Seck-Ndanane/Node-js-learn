const multer =- require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png',
};

const storage = multer.diskStorage({
    //indique a multer enregistrer  les fichiers dans images
    destination: (req, file, callback) =>{
        callback(null, 'images');
    },
    //renomme les fichiers avec en replacant les espaces par _ et ajouter la date dans le nom
    filename: (req, file, callback) =>{
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});
// exporter le multer en lui passant la constante storage et ing=diquer que nous gerons les telechqrgements uniquement
module.exports = multer({storage : storage}).single('image');
const multer = require("multer");

const path = require("path")
const limitSize = 100


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});


const multerUploadImg = multer({
    storage: storage,
    limits: {
        fileSize: limitSize * 1000, // MegaByte(s)
    },
    // custom extension
    fileFilter: (req, file, callback) => {
        const typeExt = path.extname(file.originalname);
        if (
            typeExt === ".jpg" ||
            typeExt === ".JPG" ||
            typeExt === ".png" ||
            typeExt === ".PNG" ||
            typeExt === ".jpeg" ||
            typeExt === ".JPEG"
        ) {
            callback(null, true);
        } else {
            callback({
                    error: "Wrong type extention! Please upload like png/PNG/jpg/JPG.",
                    code: "typeExtWrong",
                },
                false
            );
        }
    },
});

// make middleware
const singleImage = (req, res, next) => {
    // process upload
    const multerSingle = multerUploadImg.single("image");
    if (multerSingle) {
        multerSingle(req, res, (error) => {
            if (error) {
                if (error.code === "LIMIT_FILE_SIZE") {
                    const response = {
                        status: 413,
                        message: `Ukuran gambar terlalu besar. Batas ukuran gambar adalah ${limitSize} kb`,
                        error: error.message,
                        data: null
                    }
                    return res.status(413).json(response)
                } else if (error.code === "typeExtWrong") {
                    const response = {
                        status: 406,
                        message: `Format gambar harus JPG atau PNG`,
                        error: error.message,
                        data: null
                    }
                    return res.status(406).json(response)
                } else {
                    const response = {
                        status: 500,
                        message: `Internal server error`,
                        error: error.message,
                        data: null
                    }
                    return res.status(500).json(response)
                }
            } else {
                next();
            }
        });
    } else {
        next();
    }
};

module.exports = {
    singleImage,
};
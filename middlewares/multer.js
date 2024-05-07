const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage }).array("attachments");

const uploadFile = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error al subir el archivo");
    }
    if (!req.files || req.files.length === 0) {
      return next();
    }
    next();
  });
};

module.exports = uploadFile;

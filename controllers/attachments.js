const path = require("path");
const fs = require("fs");

const getFile = async (req, res) => {
  const filename = req.params.filename;
  console.log(filename);
  const rootDir = path.join(__dirname, "..");
  const filePath = path.join(rootDir, "uploads", filename);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send("Archivo no encontrado");
    }
    res.setHeader("Content-disposition", `attachment; filename=${filename}`);
    res.setHeader("Content-type", "application/force-download");
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  });
};

module.exports = {
  getFile,
};

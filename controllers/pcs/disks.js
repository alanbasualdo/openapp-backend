const Disks = require("../../models/PCs/Disks");

const postDisk = async (req, res) => {
  try {
    const { brand, model, type, volume } = req.body;
    const disk = await Disks.findOne({
      brand,
      model: { $regex: new RegExp(model, "i") },
      type,
      volume,
    });
    if (disk) {
      return res.status(400).json({
        success: false,
        message: "El disco ya se encuentra registrado",
      });
    }
    const newDisk = new Disks({
      brand,
      model,
      type,
      volume,
    });
    await newDisk.save();
    res.status(201).json({
      success: true,
      message: "Disco creado exitosamente",
      newDisk,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

const getDisks = async (req, res) => {
  try {
    const disks = await Disks.find();
    res.status(200).json({
      success: true,
      message: "Lista de discos obtenida exitosamente",
      disks,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

const deleteDisk = async (req, res) => {
  try {
    const { id } = req.params;
    await Disks.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Disco eliminado exitosamente",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

module.exports = {
  postDisk,
  getDisks,
  deleteDisk,
};

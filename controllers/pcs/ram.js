const RAM = require("../../models/PCs/Ram");

const postRam = async (req, res) => {
  try {
    const { brand, model, ddr, speed, volume } = req.body;
    const ram = await RAM.findOne({
      brand,
      model: { $regex: new RegExp(model, "i") },
      ddr,
      speed,
      volume,
    });
    if (ram) {
      return res.status(400).json({
        success: false,
        message: "La memoria ram ya se encuentra registrada",
      });
    }
    const newRam = new RAM({
      brand,
      model,
      ddr,
      speed,
      volume,
    });
    await newRam.save();
    res.status(201).json({
      success: true,
      message: "Memoria creada exitosamente",
      newRam,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

const getRam = async (req, res) => {
  try {
    const rams = await RAM.find();
    res.status(200).json({
      success: true,
      message: "Lista de memorias ram obtenida exitosamente",
      rams,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

const deleteRam = async (req, res) => {
  try {
    const { id } = req.params;
    await RAM.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Memoria ram eliminada exitosamente",
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
  postRam,
  getRam,
  deleteRam,
};

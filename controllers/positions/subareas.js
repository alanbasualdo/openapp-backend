const Subarea = require("../../models/Position/Subarea");

const postSubarea = async (req, res) => {
  try {
    const { name, area } = req.body;
    const subarea = await Subarea.findOne({ name, area });
    if (subarea) {
      return res.status(400).json({
        success: false,
        message: "El subárea ya se encuentra registrada",
      });
    }
    const newSubarea = new Subarea({
      name,
      area,
    });
    await newSubarea.save();
    res.status(201).json({
      success: true,
      message: "Subárea creada exitosamente",
      newSubarea,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

const getSubareas = async (req, res) => {
  try {
    const subareas = await Subarea.find();
    res.status(200).json({
      success: true,
      message: "Lista de subáreas obtenida exitosamente",
      subareas,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

const deleteSubareas = async (req, res) => {
  try {
    const { id } = req.params;
    await Subarea.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Subárea eliminada exitosamente",
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
  postSubarea,
  getSubareas,
  deleteSubareas,
};

const Area = require("../../models/Position/Area");

const postArea = async (req, res) => {
  try {
    const { name } = req.body;
    const area = await Area.findOne({ name });
    if (area) {
      return res.status(400).json({
        success: false,
        message: "El área ya se encuentra registrada",
      });
    }
    const newArea = new Area({
      name,
    });
    await newArea.save();
    res.status(201).json({
      success: true,
      message: "Área creada exitosamente",
      newArea,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

const getAreas = async (req, res) => {
  try {
    const areas = await Area.find();
    res.status(200).json({
      success: true,
      message: "Lista de áreas obtenida exitosamente",
      areas,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

const deleteArea = async (req, res) => {
  try {
    const { id } = req.params;
    await Area.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Área eliminada exitosamente",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

const putArea = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, haveTickets } = req.body;
    const updatedArea = await Area.findByIdAndUpdate(
      id,
      { name, haveTickets },
      { new: true }
    );
    if (!updatedArea) {
      return res.status(404).json({
        success: false,
        message: "Área no encontrada",
      });
    }
    res.status(200).json({
      success: true,
      message: "Área actualizada exitosamente",
      updatedArea,
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
  postArea,
  getAreas,
  deleteArea,
  putArea,
};

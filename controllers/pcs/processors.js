const Processors = require("../../models/PCs/Processors");

const postProcessor = async (req, res) => {
  try {
    const { brand, model, speed, graph, cores } = req.body;
    const processor = await Processors.findOne({
      brand,
      model: { $regex: new RegExp(model, "i") },
      speed,
      graph,
      cores,
    });
    if (processor) {
      return res.status(400).json({
        success: false,
        message: "El procesador ya se encuentra registrado",
      });
    }
    const newProcessor = new Processors({
      brand,
      model,
      speed,
      graph,
      cores,
    });
    await newProcessor.save();
    res.status(201).json({
      success: true,
      message: "Procesador creado exitosamente",
      newProcessor,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

const getProcessors = async (req, res) => {
  try {
    const processors = await Processors.find();
    res.status(200).json({
      success: true,
      message: "Lista de procesadores obtenida exitosamente",
      processors,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

const deleteProcessor = async (req, res) => {
  try {
    const { id } = req.params;
    await Processors.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Procesador eliminado exitosamente",
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
  postProcessor,
  getProcessors,
  deleteProcessor,
};

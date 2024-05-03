const Models = require("../../models/PCs/Models");

const postModel = async (req, res) => {
  try {
    const { brand, model } = req.body;
    const existModel = await Models.findOne({
      brand,
      model: { $regex: new RegExp(model, "i") },
    });
    if (existModel) {
      return res.status(400).json({
        success: false,
        message: "El modelo ya se encuentra registrado",
      });
    }
    const newModel = new Models({
      brand,
      model,
    });
    await newModel.save();
    res.status(201).json({
      success: true,
      message: "Modelo creado exitosamente",
      newModel,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

const getModels = async (req, res) => {
  try {
    const models = await Models.find();
    res.status(200).json({
      success: true,
      message: "Lista de modelos obtenida exitosamente",
      models,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

const deleteModel = async (req, res) => {
  try {
    const { id } = req.params;
    await Model.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Modelo eliminado exitosamente",
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
  postModel,
  getModels,
  deleteModel,
};

const Area = require("../../models/Position/Area");
const Categories = require("../../models/Tickets/Categories");

const postCategory = async (req, res) => {
  try {
    const { areaID, categoryName } = req.body;
    // Cambiar esta línea para pasar el ID directamente
    const existeArea = await Area.findById(areaID);
    if (!existeArea) {
      return res
        .status(409)
        .json({ success: false, message: "El área no existe" });
    }
    const existeCategory = await Categories.findOne({ categoryName });
    if (existeCategory) {
      return res
        .status(409)
        .json({ success: false, message: "La categoría ya existe" });
    }
    const newCategory = new Categories({
      area: areaID, // Asegúrate de que el campo se llama 'area' en tu esquema
      categoryName,
    });
    await newCategory.save();
    res.status(201).json({
      success: true,
      newCategory,
      message: "Categoría creada exitosamente",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error creando la categoría", error });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Categories.find().populate("area");
    res.status(200).json({
      success: true,
      message: "Lista de categorías obtenida exitosamente",
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error obteniendo las categorías",
      error,
    });
  }
};

const getCategoriesByArea = async (req, res) => {
  try {
    const { areaID } = req.params;
    const categories = await Categories.find({ area: areaID }).populate("area");
    if (!categories.length) {
      return res.status(404).json({
        success: false,
        message: "No se encontraron categorías para esta área",
      });
    }
    res.status(200).json({
      success: true,
      message: "Lista de categorías obtenida exitosamente",
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error obteniendo las categorías",
      error,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Categories.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Categoría no encontrada" });
    }
    res
      .status(200)
      .json({ success: true, message: "Categoría eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error eliminando la categoría",
      error,
    });
  }
};

module.exports = {
  postCategory,
  getCategories,
  deleteCategory,
  getCategoriesByArea,
};

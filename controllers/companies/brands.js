const Brand = require("../../models/Company/Brand");

const postBrand = async (req, res) => {
  try {
    const { company, name } = req.body;
    const brand = await Brand.findOne({ name });
    if (brand) {
      return res.status(400).json({
        success: false,
        message: "La marca ya se encuentra registrada",
      });
    }
    const newBrand = new Brand({
      company,
      name,
    });
    await newBrand.save();
    res.status(201).json({
      success: true,
      message: "Marca creada exitosamente",
      newBrand,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json({
      success: true,
      message: "Lista de marcas obtenida exitosamente",
      brands,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    await Brand.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Marca eliminada exitosamente",
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
  postBrand,
  getBrands,
  deleteBrand,
};

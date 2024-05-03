const City = require("../../models/Company/City");

const postCity = async (req, res) => {
  try {
    const { name, province } = req.body;
    const city = await City.findOne({ name, province });
    if (city) {
      return res.status(400).json({
        success: false,
        message: "La ciudad ya se encuentra registrada",
      });
    }
    const newCity = new City({
      name,
      province,
    });
    await newCity.save();
    res.status(201).json({
      success: true,
      message: "Ciudad creada correctamente",
      newCity,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

const getCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.status(200).json({
      success: true,
      message: "Lista de ciudades obtenida exitosamente",
      cities,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

const deleteCity = async (req, res) => {
  try {
    const { id } = req.params;
    await City.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Ciudad eliminada exitosamente",
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
  postCity,
  getCities,
  deleteCity,
};

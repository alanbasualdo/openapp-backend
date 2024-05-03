const Company = require("../../models/Company/Company");

const postCompany = async (req, res) => {
  try {
    const { cuit, name } = req.body;
    const company = await Company.findOne({ name });
    if (company) {
      return res.status(400).json({
        success: false,
        message: "La compañía ya se encuentra registrada",
      });
    }
    const newCompany = new Company({
      cuit,
      name,
    });
    await newCompany.save();
    res.status(201).json({
      success: true,
      message: "Compañía creada exitosamente",
      newCompany,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json({
      success: true,
      message: "Lista de compañías obtenida exitosamente",
      companies,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    await Company.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Compañía eliminada exitosamente",
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
  postCompany,
  getCompanies,
  deleteCompany,
};

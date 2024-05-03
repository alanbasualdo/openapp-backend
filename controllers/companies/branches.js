const Branch = require("../../models/Company/Branch");

const postBranch = async (req, res) => {
  try {
    const { city, province, brand, company } = req.body;
    const branch = await Branch.findOne({ city, province, brand, company });
    if (branch) {
      return res.status(400).json({
        success: false,
        message: "La sucursal ya se encuentra registrada",
      });
    }
    const newBranch = new Branch({
      city,
      province,
      brand,
      company,
    });
    await newBranch.save();
    res.status(201).json({
      success: true,
      message: "Sucursal creada exitosamente",
      newBranch,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

const getBranches = async (req, res) => {
  try {
    const branches = await Branch.find();
    res.status(200).json({
      success: true,
      message: "Lista de sucursales obtenida exitosamente",
      branches,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

const deleteBranch = async (req, res) => {
  try {
    const { id } = req.params;
    await Branch.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Sucursal eliminada exitosamente",
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
  postBranch,
  getBranches,
  deleteBranch,
};

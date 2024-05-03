const PCs = require("../../models/PCs/PCs");

const postPC = async (req, res) => {
  try {
    let {
      type,
      model,
      disk,
      ram,
      processor,
      serialNumber,
      graphicCard,
      employee,
    } = req.body;

    if (model === "") {
      model = null;
    }

    const pc = await PCs.findOne({
      serialNumber,
    });

    if (pc) {
      return res.status(400).json({
        success: false,
        message: "La computadora ya se encuentra registrada",
      });
    }

    const newPC = new PCs({
      type,
      model,
      disk,
      ram,
      processor,
      serialNumber,
      graphicCard,
      employee,
    });

    await newPC.save();

    res.status(201).json({
      success: true,
      message: "Computadora creada exitosamente",
      newPC,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

const getPCs = async (req, res) => {
  try {
    const pcs = await PCs.find()
      .populate("model")
      .populate("disk")
      .populate("ram")
      .populate("processor")
      .populate("employee");
    res.status(200).json({
      success: true,
      message: "Lista de computadoras obtenida exitosamente",
      pcs,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

const deletePC = async (req, res) => {
  try {
    const { id } = req.params;
    await PCs.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Computadora eliminada exitosamente",
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
  postPC,
  getPCs,
  deletePC,
};

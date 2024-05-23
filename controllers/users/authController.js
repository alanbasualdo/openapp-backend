const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../../helpers/generateJWT");
const User = require("../../models/User/User");

const login = async (req, res = response) => {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName })
      .populate("area")
      .populate("branch")
      .populate("position")
      .populate("subarea");
    if (!user) {
      return res.json({
        success: false,
        message: "Usuario no registrado",
      });
    }
    if (!user.state) {
      return res.json({
        success: false,
        message: "El usuario ha sido desactivado",
      });
    }
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.json({
        success: false,
        message: "Contraseña incorrecta",
      });
    }
    const token = await generateJWT(user.id);
    res.json({
      success: true,
      message: "Usted ha ingresado correctamente",
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Ha ocurrido un error en el servidor",
    });
  }
};

const renewToken = async (req, res = response) => {
  const { user } = req;
  try {
    const userExists = await User.findById(user._id)
      .populate("area")
      .populate("branch")
      .populate("position")
      .populate("subarea");
    const token = await generateJWT(user._id);
    res.json({
      success: true,
      user: userExists,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Ha ocurrido un error en el servidor",
    });
  }
};

module.exports = {
  login,
  renewToken,
};

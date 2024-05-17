const User = require("../../models/User/User");
const bcryptjs = require("bcryptjs");

const postUser = async (req, res) => {
  try {
    const {
      name,
      lastName,
      cuil,
      birthdate,
      gender,
      userName,
      email,
      password,
      admissionDate,
      departureDate,
      payroll,
      branch,
      area,
      subarea,
      position,
      permissions,
    } = JSON.parse(req.body.user);

    const fileName =
      req.files && req.files.length > 0 ? req.files[0].filename : null;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "El usuario ya está registrado" });
    }

    const salt = bcryptjs.genSaltSync();
    const hashedPassword = bcryptjs.hashSync(password, salt);

    const newUser = new User({
      name,
      lastName,
      cuil,
      birthdate,
      gender,
      userName,
      email,
      password: hashedPassword,
      admissionDate,
      departureDate,
      payroll,
      branch,
      area,
      subarea,
      position,
      permissions,
      userPhoto: fileName,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Usuario creado exitosamente",
      newUser,
    });
  } catch (error) {
    console.error("Error creando usuario:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Hubo un error al crear el usuario" });
  }
};

const getUsers = async (req, res) => {
  try {
    const [total, users] = await Promise.all([
      User.countDocuments(),
      User.find()
        .populate("branch")
        .populate("area")
        .populate("subarea")
        .populate("position"),
    ]);
    res.json({
      success: true,
      total,
      users,
    });
  } catch (error) {
    console.error("Error al obtener los usuarios", error.message);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
    });
  }
};

module.exports = {
  postUser,
  getUsers,
};

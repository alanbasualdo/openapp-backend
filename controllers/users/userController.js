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
      phoneNumber,
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
      phoneNumber,
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

const postTestUser = async (req, res) => {
  try {
    const { name, lastName, userName, password } = req.body;

    const existingUser = await User.findOne({ userName });
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
      userName,
      password: hashedPassword,
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
        .populate("position")
        .sort({ name: 1 }),
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

const putUser = async (req, res) => {
  try {
    const userId = req.params.id; // Obtiene el ID del usuario desde los parámetros de la ruta
    const {
      name,
      lastName,
      cuil,
      birthdate,
      gender,
      userName,
      email,
      admissionDate,
      departureDate,
      payroll,
      area,
      subarea,
      branch,
      position,
      permissions,
      phoneNumber,
    } = JSON.parse(req.body.user);

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado" });
    }

    // Comprueba si el email ha cambiado y si el nuevo email ya está en uso por otro usuario
    if (email !== existingUser.email) {
      const emailExists = await User.findOne({ email, _id: { $ne: userId } });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: "El email ya está en uso por otro usuario",
        });
      }
    }

    // Actualiza la foto del usuario si hay una nueva
    const fileName =
      req.files && req.files.length > 0
        ? req.files[0].filename
        : existingUser.userPhoto;

    // Actualiza los demás campos del usuario
    existingUser.name = name;
    existingUser.lastName = lastName;
    existingUser.cuil = cuil;
    existingUser.birthdate = birthdate;
    existingUser.gender = gender;
    existingUser.userName = userName;
    existingUser.email = email;
    existingUser.admissionDate = admissionDate;
    existingUser.departureDate = departureDate;
    existingUser.payroll = payroll;
    existingUser.area = area;
    existingUser.subarea = subarea;
    existingUser.branch = branch;
    existingUser.position = position;
    existingUser.permissions = permissions;
    existingUser.userPhoto = fileName;
    existingUser.phoneNumber = phoneNumber;

    await existingUser.save();

    res.status(200).json({
      success: true,
      message: "Usuario actualizado exitosamente",
      user: existingUser,
    });
  } catch (error) {
    console.error("Error actualizando usuario:", error.message);
    res.status(500).json({
      success: false,
      message: "Hubo un error al actualizar el usuario",
    });
  }
};

const putPassword = async (req, res) => {
  try {
    const userId = req.params.id; // Asegúrate de que coincida con el parámetro de la ruta en el frontend
    const { newPassword } = req.body; // Obtiene la nueva contraseña desde el cuerpo de la solicitud

    if (!newPassword) {
      return res.status(400).json({
        success: false,
        message: "La nueva contraseña es requerida",
      });
    }

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado" });
    }

    // Genera un hash para la nueva contraseña
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);

    // Actualiza la contraseña del usuario
    existingUser.password = hashedPassword;
    await existingUser.save();

    res.status(200).json({
      success: true,
      message: "Contraseña actualizada exitosamente",
    });
  } catch (error) {
    console.error("Error actualizando la contraseña:", error);
    res.status(500).json({
      success: false,
      message: "Hubo un error al actualizar la contraseña",
    });
  }
};

module.exports = {
  postUser,
  getUsers,
  putUser,
  postTestUser,
  putPassword,
};

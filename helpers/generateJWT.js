const jwt = require("jsonwebtoken");
const User = require("../models/User/User");

const generateJWT = (_id = "") => {
  return new Promise((resolve, reject) => {
    const payload = { _id };
    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: "12h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

const checkJWT = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({
      message: "No hay token en la petición",
    });
  }
  try {
    const { _id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const user = await User.findById(_id);
    if (!user) {
      return res.status(401).json({
        message: "Usuario no existe",
      });
    }
    if (!user.state) {
      return res.status(401).json({
        message: "Token no válido",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Token no válido",
    });
  }
};

module.exports = {
  generateJWT,
  checkJWT,
};

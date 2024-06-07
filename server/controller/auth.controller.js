const bcrypt = require("bcryptjs");
const User = require("../model/user.model");

const login = async (req, res) => {
    try {
      const { userEmail, userPassword } = req.body;
  
      if (!userEmail || !userPassword) {
        return res
          .status(400)
          .json({ message: "Porfavor Ingrese Correo Electrónico & Contraseña" });
      }

      const user = await User.findOne({ userEmail });
  
      if (!user) {
        return res.status(401).json({ message: "Usuario y/o Contraseña No Valido" });
      }
  
      const passwordMatch = await bcrypt.compare(userPassword, user.userPassword);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: "Usuario y/o Contraseña No Valido" });
      }
  
      return res
        .status(200)
        .json({ message: "¡Inicio de Sesión de Exitoso!", data: user });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Error al Iniciar Sesión." });
    }
  };

  module.exports = {
    login
  };
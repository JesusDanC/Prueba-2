const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../model/user.model");

const postUsers = async (req, res) => {
  const { userFirstName, userLastName, userEmail, userPassword, userRole } = req.body;

  try {
    const existingUser = await User.findOne({ userEmail });

    if (existingUser) {
      return res.status(400).json({
        ok: false,
        msg: "El correo electrónico ingresado ya existe.",
      });
    }

    const user = new User({
      userFirstName,
      userLastName,
      userEmail,
      userPassword,
      userRole,
    });

    const salt = bcrypt.genSaltSync();
    user.userPassword = bcrypt.hashSync(userPassword, salt);

    await user.save();

    res.status(200).json({
      ok: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al insertar datos",
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const userCollection = {
      userFirstName: 1,
      userLastName: 1,
      userEmail: 1,
      userRole: 1,
      userId: 1,
    };
    const users = await User.find({}, userCollection).lean();
    res.status(200).json({ ok: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error al llamar usuarios." });
  }
};

const updateUser = async (req, res = response) => {
  const userId = parseInt(req.params.id);

  try {
    const userDB = await User.findOne({userId});

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario con ese id",
      });
    }

    const newInformation = req.body;

    if (userDB.userEmail!== req.body.userEmail) {
      delete newInformation.userEmail;
    } else {
      const existsEmail = await User.findOne({ userEmail: req.body.userEmail });
      if (existsEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un usuario con ese email",
        });
      }
    }

    delete newInformation.userPassword;

    const userUpdated = await User.findOneAndUpdate({userId}, newInformation, {
      new: true,
    });

    res.json({
      ok: true,
      user: userUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al actualizar datos",
    });
  }
};

const getUserById = async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const user = await User.findOne({userId});
    if (!user) {
      return res.status(404).json({ ok: false, msg: "Usuario no Encontrado." });
    }
    res.status(200).json({ ok: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: "Server Error" });
  }
};

const deleteUser = async (req, res = response) => {
  const userId = parseInt(req.params.id);

  try {
    const userDB = await User.findOne({userId});

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario con ese id",
      });
    }

    await User.findOneAndDelete({userId});

    res.json({
      ok: true,
      msg: "Usuario eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al eliminar usuario",
    });
  }
};

module.exports = {
  getUsers,
  postUsers,
  updateUser,
  getUserById,
  deleteUser,
};

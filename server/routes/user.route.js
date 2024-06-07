const express = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middleware/validateField");
const router = express.Router();

const users = require("../controller/user.controller");

router.get("/", users.getUsers);
router.post(
  "/",
  [
    check("userFirstName", "El nombre es obligatorio").not().isEmpty(),
    check("userLastName", "El apellido es obligatorio").not().isEmpty(),
    check("userEmail", "El email es obligatorio").isEmail(),
    check("userPassword", "La contraseña es obligatoria").not().isEmpty(),
    validateFields,
  ],
  users.postUsers
);
router.put(
  "/:id",
  [
    check("userFirstName", "El nombre es obligatorio").not().isEmpty(),
    check("userLastName", "El apellido es obligatorio").not().isEmpty(),
    validateFields,
  ],
  users.updateUser
);
router.get("/:id", users.getUserById);
router.delete("/:id", users.deleteUser);

module.exports = router;

const express = require("express");
const router = express.Router();

const auth = require("../controller/auth.controller");

router.post('/', auth.login);

module.exports = router;
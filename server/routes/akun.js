const express = require("express");
const router = express.Router();

const akunController = require("../controller/index");

router.get("/", akunController.akun.getDataAccount);
router.post("/register", akunController.akun.register);
router.get("/login", akunController.akun.login);
router.delete("/hapus/:username", akunController.akun.hapusAkun);

module.exports = router;

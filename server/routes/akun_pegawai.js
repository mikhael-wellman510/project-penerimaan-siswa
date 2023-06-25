const express = require("express");
const router = express.Router();

const akunPegawaiController = require("../controller/index");

router.get("/", akunPegawaiController.akun_pegawai.getDataAkunPegawai);
router.get("/login", akunPegawaiController.akun_pegawai.loginAkunPegawai);

router.post("/registrasi", akunPegawaiController.akun_pegawai.register);
router.delete(
  "/hapus/:username",
  akunPegawaiController.akun_pegawai.hapusAkunPegawai
);

module.exports = router;

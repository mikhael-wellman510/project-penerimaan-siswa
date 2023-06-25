const express = require("express");
const router = express.Router();

// ini untuk mengambil data json web token
const verifitoken = require("../middleware/verifyToken");
const verifiTokenPegawai = require("../middleware/verifyTokenPegawai");

const mahasiswaController = require("../controller/index");

// contoh pengaplikasian json web token
router.get("/cari", mahasiswaController.kuliah.getDataMahasiswa);
// ======================= oooooo ==============================
router.get("/:nim", verifitoken, mahasiswaController.kuliah.getOneBiodata);
router.get(
  "/search/getAllData",

  mahasiswaController.kuliah.getSearchBiodata
);

router.post("/", mahasiswaController.kuliah.tambahData);
router.put("/:nim", mahasiswaController.kuliah.putBiodata);
router.delete("/:nim", mahasiswaController.kuliah.deleteMahasiswa);
module.exports = router;

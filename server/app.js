const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

// ============ Ambil Routes ==========
const routesKuliah = require("./routes/kuliah");
const routesAkun = require("./routes/akun");
const routesAkunPegawi = require("./routes/akun_pegawai");
// ================ ooo ===============

const PORT = 8001;

// ========== untuk mengetahui method post,delete,,put,create ==========
app.use(morgan("dev"));
// ================ ooo =====================

// =============== untuk menginput data di postman ==================
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// ======================== ooo ===========================================
app.use(cors({ origin: "http://localhost:3002" }));
app.use("/kuliah", routesKuliah);
app.use("/akun", routesAkun);
app.use("/akunPegawai", routesAkunPegawi);

// =============== membuat error Handling ========================
app.use((req, res, next) => {
  const error = new Error("Alamat Routes Salah");
  error.status = 404;

  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    error: {
      message: error.message,
    },
  });
});
// ==================== ooo =======================================

app.listen(PORT, () => {
  console.log(`Server Runing in port ${PORT}`);
});

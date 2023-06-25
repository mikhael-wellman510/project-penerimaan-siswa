const jwt = require("jsonwebtoken");

const authPegawai = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.send({
      message: `Mohon maaf . akses ditolak`,
    });
  }

  try {
    const verifikasi = jwt.verify(token, process.env.TOKEN_RAHASIA_PEGAWAI);
    req.user = verifikasi;
    console.log("artinya apa", verifikasi);
    next();
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};

module.exports = authPegawai;

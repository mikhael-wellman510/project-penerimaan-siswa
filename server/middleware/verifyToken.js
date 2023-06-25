const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.send("Tidak bisa mengakses ke dalam, akses dibatasi");
  }

  try {
    const verifikasi = jwt.verify(token, process.env.TOKEN_RAHASIA);
    req.user = verifikasi;
    next();
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};

module.exports = auth;

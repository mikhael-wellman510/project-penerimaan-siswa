const model = require("../config/model/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const getDataAccount = async (req, res) => {
  try {
    const akun = await model.akun.findAll();
    console.log(akun);
    if (akun.length === 0) {
      res.send({
        message: "Akun tidak ditemukan",
      });
    } else {
      res.send({
        message: `Berhasil mendapatka data akun`,
        data: akun,
      });
    }
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};

const register = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);
    const akun = await model.akun.create({
      username: username,
      password: hashPassword,
      email: email,
    });
    if (!akun.username || !akun.password || !akun.email) {
      res.send({
        message: "Silahkan isi semua data",
      });
    } else {
      res.send({
        message: `Berhasil menambahkan data`,
        data: akun,
      });
    }
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const dataAkun = await model.akun.findOne({
      where: {
        username: username,
      },
    });
    console.log(dataAkun);

    if (!dataAkun) {
      res.send({
        message: "Akun belum terdaftar",
      });
    } else {
      //ini untuk compare apakah password yg sudah di bcrypt sama hasillnya
      const resultLogin = bcrypt.compareSync(password, dataAkun.password);
      if (!resultLogin) {
        res.send({
          message: `Username atau Password yang anda masukan salah`,
        });
      } else {
        //token
        const token = jwt.sign(
          { username: dataAkun.username },
          process.env.TOKEN_RAHASIA
        );

        res.header("auth-token", token).send("Berhasil Login guys");
      }
    }
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};

const hapusAkun = async (req, res) => {
  try {
    const namaAkun = await model.akun.findOne({
      where: {
        username: req.params.username,
      },
    });
    const akun = await model.akun.destroy({
      where: {
        username: req.params.username,
      },
    });

    if (!namaAkun) {
      res.send({
        message: `Data yang ingin di hapus tidak ditemukan`,
      });
    } else {
      res.send({
        message: `Berhasil menghapus data : ${namaAkun.username}`,
      });
    }
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};

module.exports = {
  getDataAccount,
  register,
  login,
  hapusAkun,
};

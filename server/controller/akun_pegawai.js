const model = require("../config/model/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const getDataAkunPegawai = async (req, res) => {
  try {
    const akunPegawai = await model.akun_pegawai.findAll();
    console.log(akunPegawai);

    if (akunPegawai.length === 0) {
      res.send("data tidak ditemukan");
    } else {
      res.send({
        message: "Berhasil mendapatkan akun",
        data: akunPegawai,
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
    const hashPasword = await bcrypt.hashSync(password, salt);
    const akunPegawai = await model.akun_pegawai.create({
      username: username,
      password: hashPasword,
      email: email,
    });

    if (!akunPegawai.username || !akunPegawai.password || !akunPegawai.email) {
      res.send({
        message: `Silahkan isi Semua Data`,
      });
    } else {
      res.send({
        message: `Selamat ${akunPegawai.username} , akun anda sudah Teregistrasi`,
        data: akunPegawai,
      });
    }
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};

const loginAkunPegawai = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const dataAkun = await model.akun_pegawai.findOne({
      where: {
        username: username,
      },
    });

    if (!dataAkun) {
      res.send({
        message: `Akun anda belum terdaftar`,
      });
    } else {
      const resultLogin = bcrypt.compareSync(password, dataAkun.password);
      if (!resultLogin) {
        res.send({
          message: `Username atau Password Salah`,
        });
      } else {
        // INI MENGHASILKAN KODE TOKEN
        const token = jwt.sign(
          { _username: dataAkun.username },
          process.env.TOKEN_RAHASIA_PEGAWAI
        );
        console.log("hasil JWT", token);
        res
          .header("auth-token", token)
          .send(`Succes Login , Welcom home ${dataAkun.username}`);
        // res.send({
        //   message: `Succes Login ! welcome home ${dataAkun.username}`,
        // });
      }
    }
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};

const hapusAkunPegawai = async (req, res) => {
  const namaAkun = await model.akun_pegawai.findOne({
    where: {
      username: req.params.username,
    },
  });

  const akun = await model.akun_pegawai.destroy({
    where: {
      username: req.params.username,
    },
  });

  if (!namaAkun) {
    res.send({
      message: `Mohon Maaf, data Username ${namaAkun.username} tidak ditemukan`,
    });
  } else {
    res.send({
      message: `berhasil menghapus ${namaAkun.username}`,
    });
  }
};

module.exports = {
  getDataAkunPegawai,
  register,
  loginAkunPegawai,
  hapusAkunPegawai,
};

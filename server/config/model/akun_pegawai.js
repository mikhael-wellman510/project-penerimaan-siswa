const Sequelize = require("sequelize");
const db = require("../database/mysql");

const akun_pegawai = db.define(
  "akun_pegawai",
  {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    email: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

akun_pegawai.removeAttribute("id");
module.exports = akun_pegawai;

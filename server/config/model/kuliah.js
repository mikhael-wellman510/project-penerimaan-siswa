const Sequelize = require("sequelize");
const db = require("../database/mysql");

const kuliah = db.define(
  "kuliah",
  {
    // id :
    nim: Sequelize.STRING,
    nama: Sequelize.STRING,
    alamat: Sequelize.STRING,
    email: Sequelize.STRING,
    jurusan: Sequelize.STRING,
    umur: Sequelize.INTEGER,
    hobby: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// kuliah.removeAttribute("id");
module.exports = kuliah;

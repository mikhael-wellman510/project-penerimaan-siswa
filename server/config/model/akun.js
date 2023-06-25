const Sequelize = require("sequelize");
const db = require("../database/mysql");

const akun = db.define(
  "akun",
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

akun.removeAttribute("id");
module.exports = akun;

const model = require("../config/model/index");
const { Op } = require("sequelize");

// ========== Ambil semua data mahasiswa =========
const getDataMahasiswa = async (req, res) => {
  try {
    const kuliah = await model.kuliah.findAll();

    if (!kuliah) {
      res.send({
        message: "Data masih Kosong",
      });
    } else {
      res.send({
        message: "Berhasil mendapatkan Data",
        data: kuliah,
      });
    }
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};

// ================= Latihan ===============================

// const ambilDataMahasiswa = async (req, res) => {
//   try {
//     const kuliah = await model.kuliah.findAll({
//       attributes: [
//         "nim",
//         "nama",
//         "alamat",
//         "email",
//         "jurusan",
//         "umur",
//         "hobby",
//       ],
//       where: {
//         umur: {
//cari umur antara 26 sampai 29 tahun
//           [Op.between]: [26, 29],
//         },
//       },
//       order: [["umur", "asc"]],
//       limit: 2,
//     });
//     if (!kuliah) {
//       res.send({
//         message: `mohon maaf data belum ada`,
//       });
//     } else {
//       res.send({
//         message: `berhasil mendapatkan biodata`,
//         data: kuliah,
//       });
//     }
//   } catch (error) {
//     res.send({
//       message: error.message,
//     });
//   }
// };

// =============== Menu Pencarian =======================

const getSearchBiodata = async (req, res) => {
  const search = req.query.keyword;
  try {
    const mahasiswa = await model.kuliah.findAll({
      attributes: [
        "id",
        "nim",
        "nama",
        "alamat",
        "email",
        "jurusan",
        "umur",
        "hobby",
      ],
      where: {
        [Op.or]: [
          {
            nim: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            nama: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      },
    });

    if (mahasiswa.length == 0) {
      const dataSemua = await model.kuliah.findAll();
      res.send({
        data: dataSemua,
      });
      // res.send({
      //   message: "Mohon Maaf data tidak ditemukan",
      // });
    } else {
      res.send({
        message: "Berhasil mendapatkan data search",
        data: mahasiswa,
      });
    }
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};

// ================ Ambil satu data mahasiswa =============
const getOneBiodata = async (req, res) => {
  const kuliah = await model.kuliah.findOne({
    where: {
      nim: req.params.nim,
    },
  });

  if (kuliah) {
    res.send({
      message: `Berhasil mendapatkan data mahasiswa dengan nama : ${kuliah.nama}`,
      data: kuliah,
    });
  } else {
    res.send({
      message: `Mohon maaf data dengan nim : ${req.params.nim} tidak ditemukan`,
    });
  }
};

// ================ Update Data ============================
const tambahData = async (req, res) => {
  // const kuliah = await model.kuliah.create(req.body);
  const kuliah = await model.kuliah.create({
    nama: req.body.nama,
    nim: req.body.nim,
    alamat: req.body.alamat,
    email: req.body.email,
    jurusan: req.body.jurusan,
    umur: req.body.umur,
    hobby: req.body.hobby,
  });

  if (
    !kuliah.nama ||
    !kuliah.nim ||
    !kuliah.alamat ||
    !kuliah.email ||
    !kuliah.jurusan ||
    !kuliah.umur ||
    !kuliah.hobby
  ) {
    res.send({
      message: "Silahkan isi semua data",
    });
  } else {
    res.send({
      message: `Berhasil menambahkan data mahasiswa baru dengan nama ${kuliah.nama}`,
      data: kuliah,
    });
  }
};

// ============ edit data =======================
const putBiodata = async (req, res) => {
  try {
    const nama = await model.kuliah.findOne({
      where: {
        nim: req.params.nim,
      },
    });
    const kuliah = await model.kuliah.update(
      {
        nim: req.body.nim,
        nama: req.body.nama,
        alamat: req.body.alamat,
        email: req.body.email,
        jurusan: req.body.jurusan,
        umur: req.body.umur,
        hobby: req.body.hobby,
      },
      {
        where: {
          nim: req.params.nim,
        },
      }
    );

    res.send({
      message: `Berhasil mengupdate data mahasiswa atas nama : ${nama.nama}`,
      data: kuliah,
    });
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};

// ============== Hapus Data ==================
const deleteMahasiswa = async (req, res) => {
  try {
    const nama = await model.kuliah.findOne({
      where: {
        nim: req.params.nim,
      },
    });

    const kuliah = await model.kuliah.destroy({
      where: {
        nim: req.params.nim,
      },
    });

    console.log(kuliah);
    if (!kuliah) {
      res.send({
        message: "Gagal menghapus",
      });
    } else {
      res.send({
        message: `Berhasil menghapus data mahasiswa nama : ${nama.nama} `,
      });
    }
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};

module.exports = {
  getDataMahasiswa,
  getOneBiodata,
  tambahData,
  putBiodata,
  deleteMahasiswa,
  getSearchBiodata,
};

const connection = require("../configs/db");

const insertCTQuyen = async ({ danhSachChiTietQuyen }) => {
  try {
    for (let i = 0; i < danhSachChiTietQuyen.length; i++) {
      const [results, fields] = await connection.query(
        "INSERT INTO quanlikhohang.ctquyen (manhomquyen,machucnang,hanhdong) VALUES (?,?,?)",
        [
          danhSachChiTietQuyen[i].manhomquyen,
          danhSachChiTietQuyen[i].machucnang,
          danhSachChiTietQuyen[i].hanhdong,
        ]
      );
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const deleteCTQuyen = async ({ id }) => {
  try {
    const [results, fields] = await connection.query(
      "DELETE FROM quanlikhohang.ctquyen WHERE manhomquyen=?",
      [id]
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const updateCTQuyen = async ({ manhomquyen, danhSachChiTietQuyen }) => {
  try {
    await deleteCTQuyen({ id: manhomquyen });
    await insertCTQuyen({ danhSachChiTietQuyen });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = { insertCTQuyen, updateCTQuyen, deleteCTQuyen };

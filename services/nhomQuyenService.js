const connection = require("../configs/db");
const { insertCTQuyen, updateCTQuyen } = require("./chiTietQuyenService");

//them
const insertService = async ({ tenNhomQuyen, danhSachChiTietQuyen }) => {
  try {
    const [results, fields] = await connection.query(
      "INSERT INTO quanlikhohang.nhomquyen (tennhomquyen,trangthai) VALUES (?,1)",
      [tenNhomQuyen]
    );

    const [newNhomQuyen, newNhomQuyenfields] = await connection.query(
      "SELECT * FROM quanlikhohang.nhomquyen WHERE tennhomquyen=?",
      [tenNhomQuyen]
    );

    danhSachChiTietQuyen.forEach((item) => {
      item.manhomquyen = newNhomQuyen[0].manhomquyen;
    });

    console.log(danhSachChiTietQuyen);

    await insertCTQuyen({ danhSachChiTietQuyen });
    return { status: 200, message: "Thêm nhóm quyền thành công" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: error.message };
  }
};

const updateService = async ({ id, tenNhomQuyen, danhSachChiTietQuyen }) => {
  try {
    const [results, fields] = await connection.query(
      "UPDATE quanlikhohang.nhomquyen SET tennhomquyen=? WHERE manhomquyen=?",
      [tenNhomQuyen, id]
    );
    danhSachChiTietQuyen.forEach((item) => (item.manhomquyen = id));
    await updateCTQuyen({ manhomquyen: id, danhSachChiTietQuyen });
    return { status: 200, message: "Cập nhật thành công" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: error.message };
  }
};

const removeService = async ({ id }) => {
  if (!id) return { status: 400, message: "Vui lòng chọn nhóm quyền" };
  try {
    const [results, fields] = await connection.query(
      "UPDATE quanlikhohang.nhomquyen SET trangthai=0 WHERE manhomquyen=?",
      [id]
    );
    return { status: 200, message: "Xóa nhóm quyền thành công" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: error.message };
  }
};

const selectService = async ({ id }) => {
  try {
    const [results, fields] = await connection.query(
      "SELECT * FROM quanlikhohang.nhomquyen WHERE manhomquyen=?",
      [id]
    );
    let [danhSachChiTietQuyen] = await connection.query(
      "SELECT * FROM quanlikhohang.ctquyen WHERE manhomquyen=?",
      [id]
    );
    if (results && danhSachChiTietQuyen) {
      console.log(results);
      const tenNhomQuyen = results[0].tennhomquyen;
      danhSachChiTietQuyen = danhSachChiTietQuyen.map((item) => {
        if (item.manhomquyen === Number(id)) {
          return { machucnang: item.machucnang, hanhdong: item.hanhdong };
        }
        return item;
      });
      console.log(danhSachChiTietQuyen);
      return { status: 200, tenNhomQuyen, danhSachChiTietQuyen };
    }
    return { status: 404, message: "Nhóm quyền không tồn tại" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: error.message };
  }
};

module.exports = { insertService, updateService, removeService, selectService };

const connection = require("../configs/db");
const { insertCTQuyen, updateCTQuyen } = require("./chiTietQuyenService");

//them
const insertService = async ({ tenNhomQuyen, danhSachChiTietQuyen }) => {
  try {
    const [nhomquyen, nhomquyenfields] = await connection.query(
      "SELECT * FROM quanlikhohang.nhomquyen WHERE tennhomquyen=? AND trangthai=1",
      [tenNhomQuyen]
    );
    if (nhomquyen.length > 0)
      return { status: 400, message: "Nhóm quyền đã tồn tại" };

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

    await insertCTQuyen({ danhSachChiTietQuyen });
    return { status: 200, message: "Thêm nhóm quyền thành công" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: error.message };
  }
};

const updateService = async ({ id, tenNhomQuyen, danhSachChiTietQuyen }) => {
  try {
    const [nhomquyen, nhomquyenfields] = await connection.query(
      "SELECT * FROM quanlikhohang.nhomquyen WHERE tennhomquyen=? AND manhomquyen!=? AND trangthai=1",
      [tenNhomQuyen, id]
    );
    if (nhomquyen.length > 0)
      return { status: 400, message: "Nhóm quyền đã tồn tại" };

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
      "SELECT * FROM quanlikhohang.nhomquyen WHERE manhomquyen=? AND trangthai=1",
      [id]
    );
    let [danhSachChiTietQuyen] = await connection.query(
      "SELECT * FROM quanlikhohang.ctquyen WHERE manhomquyen=?",
      [id]
    );
    if (results.length > 0 && danhSachChiTietQuyen) {
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

const selectByNameService = async ({ tennhomquyen }) => {
  try {
    const [results, fields] = await connection.query(
      "SELECT * FROM quanlikhohang.nhomquyen WHERE tennhomquyen COLLATE utf8mb4_general_ci LIKE ? AND trangthai = 1",
      [`%${tennhomquyen}%`]
    );
    return { status: 200, results };
  } catch (error) {
    console.log(error);
    return { status: 500, message: error.message };
  }
};

const selectAllService = async () => {
  try {
    const [results] = await connection.query(
      "SELECT * FROM quanlikhohang.nhomquyen WHERE trangthai=1"
    );

    return { status: 200, results };
  } catch (error) {
    // Xử lý lỗi nếu có
    console.log(error);
    return { status: 500, message: error.message };
  }
};

module.exports = {
  insertService,
  updateService,
  removeService,
  selectService,
  selectByNameService,
  selectAllService,
};

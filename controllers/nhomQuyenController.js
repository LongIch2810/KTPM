const {
  insertService,
  removeService,
  selectService,
  updateService,
  selectAllService,
  selectByNameService,
} = require("../services/nhomQuyenService");

const insert = async (req, res) => {
  const { tenNhomQuyen, danhSachChiTietQuyen } = req.body;
  if (tenNhomQuyen === "" || !tenNhomQuyen)
    return res.status(400).json({ message: "Tên nhóm quyền không được trống" });
  else if (danhSachChiTietQuyen.length === 0 || !danhSachChiTietQuyen)
    return res
      .status(400)
      .json({ message: "Vui lòng chọn 1 trong các thao tác quản lý" });

  const data = await insertService({ tenNhomQuyen, danhSachChiTietQuyen });
  return res.status(data.status).json({ message: data.message });
};

const remove = async (req, res) => {
  const { id } = req.query;
  const data = await removeService({ id });
  return res.status(data.status).json({ message: data.message });
};

const select = async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ message: "Vui lòng chọn nhóm quyền" });
  const data = await selectService({ id });
  if (data.status === 200)
    return res.status(200).json({
      tennhomquyen: data.tenNhomQuyen,
      danhSachChiTietQuyen: data.danhSachChiTietQuyen,
    });
  return res.status(data.status).json({ message: data.message });
};
const selectByName = async (req, res) => {
  const { tennhomquyen } = req.query;
  if (!tennhomquyen)
    return res.status(400).json({ message: "Vui lòng nhập tên nhóm quyền" });
  const data = await selectByNameService({ tennhomquyen });
  if (data.status === 200)
    return res.status(data.status).json({ results: data.results });
  return res.status(data.status).json({ message: data.message });
};

const update = async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ message: "Vui lòng chọn nhóm quyền" });
  if (id === "1")
    return res
      .status(400)
      .json({ message: "Không thể chỉnh sửa quyền của quản lý kho" });
  const { tenNhomQuyen, danhSachChiTietQuyen } = req.body;
  if (tenNhomQuyen === "" || !tenNhomQuyen)
    return res.status(400).json({ message: "Tên nhóm quyền không được trống" });
  else if (danhSachChiTietQuyen?.length === 0 || !danhSachChiTietQuyen)
    return res
      .status(400)
      .json({ message: "Vui lòng chọn 1 trong các thao tác quản lý" });
  const data = await updateService({ id, tenNhomQuyen, danhSachChiTietQuyen });
  return res.status(data.status).json({ message: data.message });
};

const selectAll = async (req, res) => {
  const data = await selectAllService();

  if (data.status === 200) {
    return res.status(data.status).json(data.results);
  }

  return res.status(data.status).json({ message: data.message });
};

module.exports = { insert, remove, select, update, selectByName, selectAll };

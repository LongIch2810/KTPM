const express = require("express");
const {
  insert,
  remove,
  select,
  update,
  selectByName,
  selectAll,
  selectById,
} = require("../controllers/nhomQuyenController");

const apiRouter = express.Router();
apiRouter.post("/add", insert);
apiRouter.delete("/delete", remove);
apiRouter.get("/", select);
apiRouter.get("/get", selectByName);
apiRouter.get("/getbyid", selectById);
apiRouter.get("/getall", selectAll);
apiRouter.put("/update", update);

module.exports = apiRouter;

const express = require("express");
const {
  insert,
  remove,
  select,
  update,
  selectByName,
  selectAll,
} = require("../controllers/nhomQuyenController");

const apiRouter = express.Router();
apiRouter.post("/add", insert);
apiRouter.delete("/delete", remove);
apiRouter.get("/", select);
apiRouter.get("/get", selectByName);
apiRouter.get("/getall", selectAll);
apiRouter.put("/update", update);

module.exports = apiRouter;

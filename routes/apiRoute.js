const express = require("express");
const {
  insert,
  remove,
  select,
  update,
} = require("../controllers/nhomQuyenController");

const apiRouter = express.Router();
apiRouter.post("/add", insert);
apiRouter.delete("/delete", remove);
apiRouter.get("/", select);
apiRouter.put("/update", update);

module.exports = apiRouter;

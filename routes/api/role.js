const path = require("path");
const role = require(path.resolve(CONTROLLER_DIR, "role"));
const router = require("express").Router();

router.get("/", role.search);
router.post("/", role.create);
module.exports = router;

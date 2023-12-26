const path = require("path");
const role = require(path.resolve(CONTROLLER_DIR, "role"));
const router = require("express").Router();


router.post("/", role.create);
router.get("/", role.search);
router.get("/:id", role.find);
router.put('/:id',role.update)
router.delete("/:id", role.delete);
module.exports = router;

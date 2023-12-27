const path = require("path");
const router = require("express").Router();
const User = require(path.resolve(CONTROLLER_DIR, "user"));
router.get("/", User.search);
router.post("/signup", User.signup);
router.get("/:id", User.find);
router.post("/login", User.login);
router.delete('/:id',User.delete)
module.exports = router;

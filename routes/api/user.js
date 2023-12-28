const path = require("path");
const router = require("express").Router();
const User = require(path.resolve(CONTROLLER_DIR, "user"));
const {authenticationMiddleware} = require(path.resolve(UTIL_DIR,'middleware','authmiddleware'))

router.get("/", authenticationMiddleware ,User.search);
router.post("/signup", User.signup);
router.get("/:id",authenticationMiddleware , User.find);
router.post("/login", User.login);
router.delete("/:id", authenticationMiddleware ,User.delete);
router.patch("/:id", authenticationMiddleware ,User.update);
module.exports = router;

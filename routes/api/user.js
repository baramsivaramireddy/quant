const path = require("path");
const router = require("express").Router();
const User = require(path.resolve(CONTROLLER_DIR, "user"));
const {authenticationMiddleware,authorizaritionMiddleware} = require(path.resolve(UTIL_DIR,'middleware','authmiddleware'))

router.get("/", authenticationMiddleware ,authorizaritionMiddleware(['admin']),User.search);
router.post("/signup", User.signup);
router.get("/:id",authenticationMiddleware , User.find);
router.post("/login", User.login);
router.delete("/:id", authenticationMiddleware ,authorizaritionMiddleware(['admin']),User.delete);
router.patch("/:id", authenticationMiddleware ,User.update);
router.post("/forgotpassword",User.forgotpassword)
module.exports = router;

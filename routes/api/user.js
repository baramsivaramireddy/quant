const path = require("path");
const router = require("express").Router();
const User = require(path.resolve(CONTROLLER_DIR, "user"));
const {authenticationMiddleware,authorizationMiddleware} = require(path.resolve(UTIL_DIR,'middleware','authmiddleware'))

router.get("/", authenticationMiddleware ,authorizationMiddleware(['admin']),User.search);
router.post("/signup", User.signup);
router.get("/:id",authenticationMiddleware , User.find);
router.post("/login", User.login);
router.post("/forgotpassword",User.forgotpassword)
router.post("/changepassword",User.changepassword)
router.delete("/:id", authenticationMiddleware ,authorizationMiddleware(['admin']),User.delete);
router.patch("/:id", authenticationMiddleware ,User.update);

module.exports = router;

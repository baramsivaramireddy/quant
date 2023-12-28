const path = require("path");
const role = require(path.resolve(CONTROLLER_DIR, "role"));
const router = require("express").Router();
const {authenticationMiddleware} = require(path.resolve(UTIL_DIR,'middleware','authmiddleware'))

router.post("/", authenticationMiddleware ,role.create);
router.get("/", authenticationMiddleware ,role.search);
router.get("/:id",authenticationMiddleware , role.find);
router.put('/:id',authenticationMiddleware ,role.update)
router.delete("/:id", authenticationMiddleware ,role.delete);
module.exports = router;

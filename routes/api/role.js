const path = require("path");
const role = require(path.resolve(CONTROLLER_DIR, "role"));
const router = require("express").Router();
const {authenticationMiddleware,authorizaritionMiddleware} = require(path.resolve(UTIL_DIR,'middleware','authmiddleware'))

router.post("/", authenticationMiddleware,authorizaritionMiddleware(['admin']) ,role.create);
router.get("/", authenticationMiddleware ,authorizaritionMiddleware(['admin']),role.search);
router.get("/:id",authenticationMiddleware , authorizaritionMiddleware(['admin']),role.find);
router.put('/:id',authenticationMiddleware ,authorizaritionMiddleware(['admin']),role.update)
router.delete("/:id", authenticationMiddleware ,authorizaritionMiddleware(['admin']),role.delete);
module.exports = router;

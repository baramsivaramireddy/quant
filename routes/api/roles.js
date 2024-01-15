const path = require("path");
const role = require(path.resolve(CONTROLLER_DIR, "role"));
const router = require("express").Router();
const {authenticationMiddleware,authorizationMiddleware} = require(path.resolve(UTIL_DIR,'middleware','authmiddleware'))

router.post("/", authenticationMiddleware,authorizationMiddleware(['admin']) ,role.create);
router.get("/", authenticationMiddleware ,authorizationMiddleware(['admin']),role.search);
router.get("/:id",authenticationMiddleware , authorizationMiddleware(['admin']),role.find);
router.put('/:id',authenticationMiddleware ,authorizationMiddleware(['admin']),role.update)
router.delete("/:id", authenticationMiddleware ,authorizationMiddleware(['admin']),role.delete);
module.exports = router;

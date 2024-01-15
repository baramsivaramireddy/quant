
const path = require('path')
const category  = require(path.resolve(CONTROLLER_DIR, 'category'));

const router = require('express').Router()

const {authenticationMiddleware,authorizationMiddleware} = require(path.resolve(UTIL_DIR,'middleware','authmiddleware'))
router.get('/' ,authenticationMiddleware, category.search)
router.post('/' ,authenticationMiddleware,authorizationMiddleware(['admin','expert']) ,category.create)
router.get('/:id' , authenticationMiddleware ,category.find)
router.patch('/:id',authenticationMiddleware , authorizationMiddleware(['admin','expert']),category.update)
router.delete("/:id", authenticationMiddleware,authorizationMiddleware(['admin','expert']),category.delete )
module.exports= router

const path = require('path')
const category  = require(path.resolve(CONTROLLER_DIR, 'category'));

const router = require('express').Router()

const {authenticationMiddleware,authorizaritionMiddleware} = require(path.resolve(UTIL_DIR,'middleware','authmiddleware'))
router.get('/' ,authenticationMiddleware, category.search)
router.post('/' ,authenticationMiddleware,authorizaritionMiddleware(['admin','expert']) ,category.create)
router.get('/:id' , authenticationMiddleware ,category.find)
router.patch('/:id',authenticationMiddleware , authorizaritionMiddleware(['admin','expert']),category.update)
router.delete("/:id", authenticationMiddleware,authorizaritionMiddleware(['admin','expert']),category.delete )
module.exports= router
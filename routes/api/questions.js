const path = require('path')
const question  = require(path.resolve(CONTROLLER_DIR,'question'))
const router = require('express').Router()
const {authenticationMiddleware , authorizationMiddleware} = require(path.resolve(UTIL_DIR,'middleware','authmiddleware'))

router.get('/',question.search);

router.post('/',authenticationMiddleware,authorizationMiddleware(['admin' , 'expert']), question.create);
router.patch('/:id',authenticationMiddleware,authorizationMiddleware(['admin' , 'expert']), question.update);
router.get('/:id',question.find);
router.delete('/:id',authenticationMiddleware,authorizationMiddleware(['admin' , 'expert']), question.delete);
module.exports  = router;
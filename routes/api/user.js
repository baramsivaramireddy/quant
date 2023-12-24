const path = require('path');
const router = require('express').Router();

router.get('/',(req,res) =>{
    res.status(200).json({
        message:"all users"
    })
})
module.exports = router;
var express = require('express');
var router = express.Router();
var userRouter = require('./users')
const productRouter = require("./product");
const auth = require("../middlewares/authentication");

router.use('/users',userRouter);
router.use(auth);
router.use('/products',  productRouter);

module.exports = router;
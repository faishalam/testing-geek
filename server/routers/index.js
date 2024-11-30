const express = require('express')
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')

const router = express.Router()

router.use("/", userRouter)
router.use("/", productRouter)


module.exports = router
const express = require('express')
const productRouter = express.Router()
const errorHandler = require('../middleware/errorHandler')
const productController = require('../controllers/productController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')



module.exports = productRouter
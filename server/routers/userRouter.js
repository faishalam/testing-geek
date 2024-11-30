const express = require('express')
const userRouter = express.Router()
const errorHandler = require('../middleware/errorHandler')
const userController = require('../controllers/userControllers')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')



module.exports = userRouter
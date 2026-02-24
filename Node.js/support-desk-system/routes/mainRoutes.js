const express = require('express');
const { log, timeStamp } = require('node:console');
const router = express.Router()
const catchAsync = require('../utils/catchAsync')

router.get('/status', catchAsync((req, res)=>{
    console.log("Status 200: Working");
    res.status(200).json({
        status: "success",
        message: "Server is running",
        timestamp: new Date().toISOString()
    });
}))

module.exports = router;
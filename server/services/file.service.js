const mongoose = require('mongoose');
const File = require('../models/file');
const multer = require('multer');
const fs = require('fs')
const path = require('path')
const btoa = require('btoa')

const fileConfig = require('../config/file.config')
const mongoDB = fileConfig.dbConnection;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;


module.exports = {
    getAll: (req, res, next) => {
        File.find((err, files) => {
            if (err) {
                return res.status(404).end();
            }
            console.log('File fetched successfully');
            res.send(files);
        });
    }
}
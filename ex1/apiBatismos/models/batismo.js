const mongoose = require('mongoose')

var batismoSchema = new mongoose.Schema({
    date: String,
    title: String,
    ref: String,
    href: String,
    mae:String,
    pai:String
  });

module.exports = mongoose.model('batismo', batismoSchema)
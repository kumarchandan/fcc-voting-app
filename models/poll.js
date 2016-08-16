// models/poll.js

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var pollSchema = new Schema({
    title: String,
    options: [{ text: String, vote: Number }],
    ownerUserid: String,
    voterUserid: [],
    voterIP: []
})

// create the model for poll and expose
module.exports = mongoose.model('Poll', pollSchema)
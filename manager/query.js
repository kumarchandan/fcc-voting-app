// query.js

var url = require('../config/database')
var mongo = require('mongodb').MongoClient

var db_url = url.mongo_url

// get all polls from db
function getPolls(req, res, next) {
    // connect to db
    mongo.connect(db_url, function(err, db) {
        if(err) throw err

        try {
            db.collection('polls').find().toArray(function(err, doc) {
                if(err) throw err
                if(doc.length !== 0) {
                    console.log(doc)
                    res.status(200).json({
                        data: doc
                    })
                } else {
                    res.status(200).json({
                        msg: 'no data found in db'
                    })
                }
            })
        } catch (error) {
            throw error
        } finally {
            db.close()
        }
        
    })
}

module.exports = {
    getPolls: getPolls
}
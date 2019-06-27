var exress = require('express');
var router = exress.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var { body, check, validationResult } = require('express-validator/check');
var { sanitizeBody } = require('express-validator/filter');

const mongoHost = 'mongodb';
const mongoPort = 27017;

var mongoHelper = require('../helpers/mongo');

var requestRules = {
    post: [
        check('title').isLength({min: 3}).withMessage('must be at least 3 characters long'),
        check('content').isLength({min: 10}).withMessage('must be at least 10 characters long')
    ]
}


var mongoUrl = "mongodb://" + mongoHost + ":" + mongoPort;
var dbName = "articlesdb";
var collectionName = "articles"

var mongoClient = new mongo(mongoUrl, {useNewUrlParser: true});

var respondData = function (res, data) {
    return res.json
}

router.get('/', function (req, res, next) {
    let getResults = null;
    mongoClient.connect(async function () {
        getResults = await mongoHelper.get(mongoClient, dbName, collectionName);
        return res.json({
            data: getResults
        });
    })
});

router.post('/', requestRules.post, function (req, res, next) {
    const requestErrors = validationResult(req);
    if (!requestErrors.isEmpty()) {
        return res.status(422).json({
            errors: requestErrors.array()
        });
    }
    const articleData = {
        title: req.body.title,
        content: req.body.content
    };
    let insertResults = null;
    mongoClient.connect(async function () {
        insertResults = await mongoHelper.insert(mongoClient, dbName, collectionName, articleData);
        mongoClient.close();
        return res.json({
            data: insertResults.ops[0]
        });
    });
})

router.get('/:id', function (req, res, next) {
    let getResults = null;
    let objId = req.params.id;
    mongoClient.connect(async function () {
        getResults = await mongoHelper.get(mongoClient, dbName, collectionName, objId);
        return res.json({
            data: getResults
        });
    })
})

module.exports = router;
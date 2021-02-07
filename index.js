const express = require('express');
const fs = require('fs');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const assert = require('assert');
const url = 'mongodb://220.83.97.41:27017/phdb';

function connect_mongodb(response){
    async.waterfall([
        function(callback){
            MongoClient.connect(url, function(err, db){
                assert.equal(null, err);

                console.log('Connected correctly to server');

                db.close();

                callback(null, 'connect mongodb');
            });
        }
    ],
    function (callback, message){
        res.send(message);

        console.log('-----------------------');
    });
}

function insert(db, id, pw, sn, callback){
    db.collection('users')
    .insertOne( {
        "id": id,
        "pw": pw,
        "sn": sn
    }, function(err, result){
        assert.equal(err, null);

        console.log('Inserted a document into the restaurants collection.');

        db.close();

        callback(null, 'insert success mongodb');
    });
}

function find(db, callback){
    db.collection('users', function(err, collection){
        collection
        .find()
        .sort({
            'id':1
        })
        .toArray(function(err, items){
            assert.equal(err, null);

            console.log(items);

            db.close();

            callback(null, 'find ok,..', items);
        });
    });
}
function update(db, callback){
    db.collection('users').updateOne(
        {'id':update_condition_name},
        {$set: {"age":update_age_value}},
    function(err, results){
        assert.equal(null, err);

        db.close();

        callback(null, 'update ok');
    });
}

function remove(db, callback)
{
    db.collection('users').deleteOne({
        "name":remove_condition_name
    }, function(err, results){
        assert.equal(null, err);

        db.close();

        callback(null, 'remove ok');
    });
}

function count(db, callback)
{
    db.collection('users').count({}, function(err, numOfDocs){
        assert.equal(null, err);

        db.close();

        callback(null, numOfDocs);
    });
}

function indexing(db, callback){
    db.collection('user').createIndex({
        'number':1
    }, null, function(err, results){
        assert.equal(null, err);

        db.close();

        callback(null, 'create index success');
    });
}

function dropindex(db, callback){
    db.collection('users').dropIndex({
        'name':1
    }, null, function(err, results){
        assert.equal(null, err);

        db.close();

        callback(null, 'drop index success');
    });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));
app.locals.pretty = true;

app.get('/', function(req, res){
    res.render('main', {title:"다양한 블로그 PAT Head", description :"여기는 메인 화면입니다."});
});

app.post('/connect_mongodb', function(req, res){
    console.log('connect mongodb...');


    connect_mongodb(res);
})

app.listen(3000, () => {
    console.log('Server open port : 3000');
});
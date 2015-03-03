var express = require("express");
var bodyparser = require("body-parser");
var Hashtag = require("./model/hashtagModel");
var validator = require('validator');
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/assignment4');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log("connection successful");
});

var app = express();
app.use(bodyparser.urlencoded({ extended: false }));


var port = process.env.PORT || 8080;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


var router = express.Router();

router.get('/', function(req, res) {
    Hashtag.find().sort({created_at: -1}).limit(10).exec(function(err, names){
        if(err){
            res.send(err);
        }
        res.send(names);
    });
});

router.post('/', function(req, res) {
    var hashtag = new Hashtag();
    hashtag.name = validator.escape(req.body.name);
    console.log(req.body.name);
    hashtag.created_at = new Date();
    hashtag.save(function (err) {
        if (err) {
            res.send(err);
        }
        res.json({message: "done"});
    });
});
router.put('/:id', function(req, res){
    var id = validator.toString(req.body.id);
    var name = validator.sanitize(req.body.name);
    Hashtag.update({__id: id}, function(err){
        if(err){
            res.send(err);
        }
        res.send("uppdated");
    });
});
router.delete('/:id', function(req, res){

    var id = validator.toString(req.body.id);
    console.log(id);
    Hashtag.remove({__id: id}, function(err){
        if(err){
            res.send(err);
        }
        res.send("Deleted");
    });

});


app.use('/api', router);

app.listen(port);
console.log('Listening at port :  ' + port);





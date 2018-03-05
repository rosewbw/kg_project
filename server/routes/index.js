var express = require('express');
var router = express.Router();
var tUser= global.dbHandel.getModel('tUser');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/login', function(req, res, next) {
    let username = req.body.username,
        password = req.body.password,
        type = req.body.type,
        email = req.body.email;
    let userId = req.session.id;
    let doc = {
        _id: userId,
        name:username,
        PassWord:password,
        usertype:type,
        Email:email,

    };
    tUser.findOne({name: username}, function (err, doc) {
        if (err) {
            res.sendStatus(500);
            console.log(err);
        } else if (!doc) {//用户不存在
            res.json({status:'none'});
            res.end();
        } else {
            req.session.user = username;
            req.session.userId = doc._id;
            res.json({status:200,name:doc.name});
        }
    });

});
router.post('/register', function(req, res, next) {
    let username = req.body.username,
        password = req.body.password,
        type = req.body.type,
        email = req.body.email;
    let userId = req.session.id;
    let docs = {
        _id: userId,
        name:username,
        PassWord:password,
        usertype:type,
        Email:email,

    };

    tUser.findOne({name: username}, function (err, doc) {
        if (err) {
            res.sendStatus(500);
        } else if (doc) {
            //req.session.error='用户名已存在！';
            res.json("username exists");
            res.end();
        } else {
            tUser.create(docs, function (err, doc) {
                if (err) {
                    res.sendStatus(404);
                } else {
                    req.session.user = doc.name;
                    req.session.userId = doc._id;
                    res.json({status:200});
                }
            })
        }
    });

});
module.exports = router;

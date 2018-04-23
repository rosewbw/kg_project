var express = require('express');
var router = express.Router();

let user = require('./user/index');
let graph = require('./graph/index');

let tokenObj = require('./utils/token');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});


router.post('/login', user.login);
router.post('/register', user.register);
router.post('/upload', tokenObj.checkToken, graph.upload);
router.post('/upload', tokenObj.checkToken, graph.updateTeacher);

module.exports = router;

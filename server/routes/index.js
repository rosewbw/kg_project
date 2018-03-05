var express = require('express');
var router = express.Router();



let user = require('./user/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/login',user.login);
router.post('/register',user.register);

module.exports = router;

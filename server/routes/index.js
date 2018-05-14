var express = require('express');
var router = express.Router();

let user = require('./user/index');
let graph = require('./graph/index');
let project = require('./project/index');

let tokenObj = require('./utils/token');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});


router.post('/login', user.login);
router.post('/register', user.register);
router.get('/fetchUserInfoWithToken', tokenObj.checkToken, user.fetchUserInfo);
router.post('/upload', tokenObj.checkToken, graph.material.uploadMaterial);
router.post('/getMediaList', tokenObj.checkToken, graph.material.getMaterialList);
// router.post('/upload', tokenObj.checkToken, graph.updateTeacher);
router.post('/addProject', tokenObj.checkToken, project.addProject);
router.post('/getProject', tokenObj.checkToken, project.getProject);
router.post('/getProjectData', tokenObj.checkToken, project.getProjectData);
router.post('/saveProjectData', tokenObj.checkToken, project.saveProjectData);
router.post('/deleteProject', tokenObj.checkToken, project.deleteProject);


module.exports = router;

var express = require('express');
var router = express.Router();

let user = require('./user');
let graph = require('./graph');
let project = require('./project');
let material = require('./material');

let tokenObj = require('./utils/token');

/* 页面获取 */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

/* 登录注册验证 */
router.post('/login', user.login);
router.post('/register', user.register);
router.get('/fetchUserInfoWithToken', tokenObj.checkToken, user.fetchUserInfo);

/* 课程 */
router.post('/upload', tokenObj.checkToken, graph.upload);
router.post('/upload', tokenObj.checkToken, graph.updateTeacher);
router.post('/upload', tokenObj.checkToken, graph.material.uploadMaterial);
router.post('/getMediaList', tokenObj.checkToken, graph.material.getMaterialList);
// router.post('/upload', tokenObj.checkToken, graph.updateTeacher);
router.post('/addProject', tokenObj.checkToken, project.addProject);
router.post('/getProject', tokenObj.checkToken, project.getProject);
router.post('/getProjectData', tokenObj.checkToken, project.getProjectData);
router.post('/saveProjectData', tokenObj.checkToken, project.saveProjectData);
router.post('/deleteProject', tokenObj.checkToken, project.deleteProject);


module.exports = router;

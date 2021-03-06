var express = require('express');
var router = express.Router();

let user = require('./user');
let graph = require('./graph');
let project = require('./project');
let material = require('./material');
let course = require('./course');
let search = require('./search');

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
router.post('/addProject', tokenObj.checkToken, project.addProject);
router.post('/getProject', tokenObj.checkToken, project.getProject);
router.post('/getProjectData', tokenObj.checkToken, project.getProjectData);
router.post('/saveProjectData', tokenObj.checkToken, project.saveProjectData);
router.post('/deleteProject', tokenObj.checkToken, project.deleteProject);
router.post('/getCourse', tokenObj.checkToken, course.getCourse);
router.post('/publishCourse', tokenObj.checkToken, course.publishCourse);

/* 课程学习 */
router.post('/getCourse', tokenObj.checkToken, course.getCourse);
router.get('/getAllCourses', tokenObj.checkToken, course.getAllCourses);

/* 资源 */
router.post('/upload', tokenObj.checkToken, material.uploadMaterial);
router.get('/materials', tokenObj.checkToken, material.getMaterial);
router.delete('/deleteMaterial', tokenObj.checkToken, material.deleteMaterial);
router.put('/updateMaterial', tokenObj.checkToken, material.updateMaterial);

/* 检索 */
router.post('/search', tokenObj.checkToken, search.getSearchResult);


module.exports = router;

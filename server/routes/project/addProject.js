let uuid = require('node-uuid');
module.exports = function (req, res, next) {
    let tokenKey = req.api_user;
    let username = req.body.username;
    if (tokenKey.param !== username) {
        res.json({
            status: false,
            message: "验证失败"
        });
        res.end();

    } else {
        let projectData = req.body.newProjectData;
        let tProject = global.dbHandel.getModel('tProject');
        let date = new Date().toLocaleString();
        let projectId = uuid.v4();
        let data = {
            _id: projectId,
            projectName: projectData.title,
            userName: username,
            thumbnailUrl: projectData.thumbnailUrl||'',
            data: {},
            publishStatus: projectData.publishStatus||'unPublish',
            createDate: date,
            updateDate: date,
            description: projectData.description || '',
            startPosition:{
                x:250,
                y:300
            }
        };
        tProject.create(data, function (err, doc) {
            if (doc) {
                res.json({
                    status:'success',
                    data:doc
                });
            } else {
                res.json({
                    status:'false',
                    message:'工程数据创建失败'
                })
            }
        })

    }

};
let uuid = require('node-uuid');
module.exports = function (req, res, next) {
    const tokenKey = req.api_user;
    const username = req.body.username;
    if (tokenKey.param !== username) {
        res.json({
            status: false,
            message: "验证失败"
        });
        res.end();

    } else {
        const projectData = req.body.newProjectData;
        const tProject = global.dbHandel.getModel('tProject');
        const tUser = global.dbHandel.getModel('tUser');
        const date = new Date().toLocaleString();
        const projectId = uuid.v4();

        tUser.findOne({name: username}, (err, user) => {
            if (err) {
                return res.statusCode(404)
            }
            let data = {
                _id: projectId,
                projectName: projectData.title,
                userName: username,
                userId: user._id,
                thumbnailUrl: projectData.thumbnailUrl || '',
                data: {},
                publishStatus: projectData.publishStatus || 'unPublish',
                createDate: date,
                updateDate: date,
                description: projectData.description || '',
                startPosition: {
                    x: 250,
                    y: 300
                }
            };
            tProject.create(data, function (err, doc) {
                if (doc) {
                    res.json({
                        status: 'success',
                        data: doc
                    });
                } else {
                    res.json({
                        status: 'false',
                        message: '工程数据创建失败'
                    })
                }
            })

        });
    }

};
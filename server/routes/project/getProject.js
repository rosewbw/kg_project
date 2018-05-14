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
        let tProject = global.dbHandel.getModel('tProject');
        tProject.find({userName:username}, function (err, doc) {
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
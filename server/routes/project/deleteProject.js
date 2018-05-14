module.exports = function (req, res, next) {
    let tokenKey = req.api_user;
    let username = req.body.username;
    let projectId = req.body.projectId;
    if (tokenKey.param !== username) {
        res.json({
            status: false,
            message: "验证失败"
        });
        res.end();
    } else {
        let tProject = global.dbHandel.getModel('tProject');
        tProject.remove({userName:username,_id:projectId}, function (err, doc) {
            if (doc) {
                tProject.find({userName:username},function (err, docs) {
                    if(docs){
                        res.json({
                            status:'success',
                            data:docs
                        });
                    }else{
                        res.json({
                            status:'false',
                            message:'工程数据获取失败'
                        })
                    }
                })
            } else {
                res.json({
                    status:'false',
                    message:'工程数据删除失败'
                })
            }
        })
    }
};
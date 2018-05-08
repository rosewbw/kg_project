let tokenObj = require('../utils/token');

module.exports = function (req, res, next) {
    let tUser= global.dbHandel.getModel('tUser');
    let username = req.body.username,
        password = req.body.password;

    tUser.findOne({name: username,password:password}, function (err, doc) {
        if (err) {
            return res.json({
                status:false,
                data:"Error occured:" + err
            });
        }

        if(doc){
            let token = tokenObj.createToken(doc.name);
            res.header('Access-Control-Expose-Headers', 'access-token');
            res.json({
                status:'success',
                data:{
                    usertype:doc.usertype,
                    username:doc.name,
                    token:token
                }
            })
        }else{
            res.json({
                status: false,
                data: "Incorrect email/password"
            });
        }
    });
};
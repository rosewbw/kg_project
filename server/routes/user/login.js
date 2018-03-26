module.exports = function (req, res, next) {
    let tUser= global.dbHandel.getModel('tUser');
    let username = req.body.username,
        password = req.body.password,
        type = req.body.type;
    tUser.findOne({name: username,PassWord:password,usertype:type}, function (err, doc) {
        if (err) {
            res.json({
                type:false,
                data:"Error occured:" + err
            });
        } else if(doc){
            res.header('Access-Control-Expose-Headers', 'access-token');
            res.json({
                type:true,
                data:doc,
                token:doc.token
            })
        }else{
            res.json({
                type: false,
                data: "Incorrect email/password"
            });
        }
    });
};
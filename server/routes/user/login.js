module.exports = function (req, res, next) {
    let tUser= global.dbHandel.getModel('tUser');
    let username = req.body.username,
        password = req.body.password,
        type = req.body.type,
        email = req.body.email;
    let userId = req.session.id;
    tUser.findOne({name: username,PassWord:password,usertype:type}, function (err, doc) {
        if (err) {
            res.json({
                type:false,
                data:"Error occured:" + err
            });
        } else if(doc){
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
}

// if (err) {
//     res.json({
//         type:false,
//         data:"Error occured:" + err
//     });
// } else if (!doc) {//用户不存在
//     res.json({status:'none'});
//     res.end();
// } else {
//     req.session.user = username;
//     req.session.userId = doc._id;
//     res.json({status:200,name:doc.name});
// }